import { ITank } from './ITank';
import { randomID } from './Utilities';

type ConfigWritable = ITank;

export class ConfigWriter {
  public static writeConfig(items: ConfigWritable[]): string {
    const output: string[] = [];

    for (let i = 0; i < items.length; i++) {
      const item: ConfigWritable = items[i];
      const parts: string [] = [];

      if (item.disabled) {
        continue;
      }

      if (item.team) {
        const tankDef: ITank = item as ITank;

        parts.push(`[${tankDef.name || 'Tank_' + randomID()}]`);
        parts.push(`type = tank`);
        parts.push(`team = ${tankDef.team}`);
        parts.push(`pos = ${tankDef.position[0]} ${tankDef.position[1]} ${tankDef.position[2]}`);
        parts.push(`rot = ${tankDef.rotation}`)
      }

      output.push(parts.join('\n'));
    }

    return output.join('\n\n\n').trim();
  }
}
