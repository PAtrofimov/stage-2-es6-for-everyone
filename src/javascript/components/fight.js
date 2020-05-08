import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    if (firstFighter.health <= 0) {
      resolve(secondFighter);
    } else if (secondFighter.health <= 0) {
      resolve(firstFighter);
    }
  });
}

export function getDamage(attacker, defender) {
  // return damage
  const hitPower = getHitPower(attacker);
  const blockPower = getBlockPower(defender);
  return blockPower > hitPower ? 0 : hitPower - blockPower;
}

export function getHitPower(fighter) {
  // return hit power
  const { attack } = fighter;
  const criticalHitChance = Math.random() + 1;
  return attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  // return block power
  const { defense } = fighter;
  const dodgeChance = Math.random() + 1;
  return defense * dodgeChance;
}
