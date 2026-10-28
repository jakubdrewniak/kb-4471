// The problems inside a merged ticket, one per fix. Reports are counted the desk's way: by cause
// (causes.ts), where they're filed. A report the desk read as a one-day move (desk-notes.json) is not
// a day/month swap, so it is a problem of its own too; it stays counted under the cause it's filed in.
import { groupByCause, type Cause, type Report, type Tenant } from '#lib/kb/causes';

export type Problem = Cause | 'one-day';
export const PROBLEMS: readonly Problem[] = ['parser', 'hint', 'one-day'];

export type ProblemGroup = {
  problem: Problem | 'unplaced';
  reports: Report[];
  tenants: string[];
  channels: Record<string, number>;
  firstSeen: string;
  lastSeen: string;
  // For one-day: the cause these reports are filed and counted under.
  filedUnder?: string[];
};

function group(problem: ProblemGroup['problem'], rs: Report[]): ProblemGroup {
  const days = rs.map((r) => r.receivedAt.slice(0, 10)).sort();
  return {
    problem,
    reports: rs,
    tenants: [...new Set(rs.map((r) => r.tenant))].sort(),
    channels: rs.reduce<Record<string, number>>((n, r) => ({ ...n, [r.channel]: (n[r.channel] ?? 0) + 1 }), {}),
    firstSeen: days[0],
    lastSeen: days[days.length - 1],
  };
}

export function groupByProblem(
  reports: Report[],
  tenantOf: (r: Report) => Tenant | undefined,
  oneDayMove: readonly string[],
): ProblemGroup[] {
  const causes = groupByCause(reports, tenantOf);
  const groups = causes.map((g) => group(g.cause, g.reports));
  const moved = reports.filter((r) => oneDayMove.includes(r.id));
  if (moved.length) {
    const filedUnder = causes.filter((g) => g.reports.some((r) => oneDayMove.includes(r.id))).map((g) => g.cause);
    groups.push({ ...group('one-day', moved), filedUnder });
  }
  return groups;
}
