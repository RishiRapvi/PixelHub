import { getPreferenceValues } from "@raycast/api";

type Preferences = {
  knownTargets?: string;
};

const DEFAULT_KNOWN_TARGETS = ["192.168.68.66:5555", "192.168.68.75:5555"];

export function getKnownTargets(): string[] {
  const preferences = getPreferenceValues<Preferences>();
  const knownTargets = preferences.knownTargets?.trim();

  if (!knownTargets) {
    return DEFAULT_KNOWN_TARGETS;
  }

  return knownTargets
    .split(",")
    .map((target) => target.trim())
    .filter(Boolean);
}
