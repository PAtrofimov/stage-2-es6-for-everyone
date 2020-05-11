import {controls} from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over

    const healthBarFirst = document.getElementById('left-fighter-indicator');
    const healthBarSecond = document.getElementById('right-fighter-indicator');

    healthBarFirst.style.width = '100%';
    healthBarSecond.style.width = '100%';

    const states = {
      PlayerOne: { lastTimeSuperHit: null, IsBlocking: false, health: firstFighter.health },
      PlayerTwo: { lastTimeSuperHit: null, IsBlocking: false, health: secondFighter.health },
    };

    const pressedKeysSuperHitFirst = new Set();
    const pressedKeysSuperHitSecond = new Set();

    document.addEventListener('keydown', function (event) {
      const currentAction = event.code;

      switch (currentAction) {
        case controls.PlayerOneAttack:
          if (!states.PlayerTwo.IsBlocking && !states.PlayerOne.IsBlocking) {
            states.PlayerTwo.health -= getDamage(firstFighter, secondFighter);
            states.PlayerTwo.health = states.PlayerTwo.health < 0 ? 0 : states.PlayerTwo.health;
            healthBarSecond.style.width = (100 * states.PlayerTwo.health) / secondFighter.health + '%';
          }
          break;
        case controls.PlayerOneBlock:
          states.PlayerOne.IsBlocking = true;
          break;
        case controls.PlayerTwoAttack:
          if (!states.PlayerOne.IsBlocking && !states.PlayerTwo.IsBlocking) {
            states.PlayerOne.health -= getDamage(secondFighter, firstFighter);
            states.PlayerOne.health = states.PlayerOne.health < 0 ? 0 : states.PlayerOne.health;
            healthBarFirst.style.width = (100 * states.PlayerOne.health) / firstFighter.health + '%';
          }
          break;
        case controls.PlayerTwoBlock:
          states.PlayerTwo.IsBlocking = true;
          break;

        default:
          break;
      }

      if ([...controls.PlayerOneCriticalHitCombination].some((it) => it == currentAction)) {
        pressedKeysSuperHitFirst.add(currentAction);
      } else if ([...controls.PlayerTwoCriticalHitCombination].some((it) => it == currentAction)) {
        pressedKeysSuperHitSecond.add(currentAction);
      }

      if (
        pressedKeysSuperHitFirst.size === 3 &&
        [...pressedKeysSuperHitFirst].every((it) => controls.PlayerOneCriticalHitCombination.includes(it))
      ) {
        if (!states.PlayerOne.IsBlocking && CanSuperHit(states.PlayerOne.lastTimeSuperHit)) {
          //damaged Second superhit from First player
          states.PlayerTwo.health -= getDamageSuperHit(firstFighter);
          states.PlayerTwo.health = states.PlayerTwo.health < 0 ? 0 : states.PlayerTwo.health;
          healthBarSecond.style.width = (100 * states.PlayerTwo.health) / secondFighter.health + '%';
          states.PlayerOne.lastTimeSuperHit = new Date();
        }
        pressedKeysSuperHitFirst.clear();
      } else if (
        pressedKeysSuperHitSecond.size === 3 &&
        [...pressedKeysSuperHitSecond].every((it) => controls.PlayerTwoCriticalHitCombination.includes(it))
      ) {
        if (!states.PlayerTwo.IsBlocking && CanSuperHit(states.PlayerTwo.lastTimeSuperHit)) {
          //damaged First superhit from Second player
          states.PlayerOne.health -= getDamageSuperHit(secondFighter);
          states.PlayerOne.health = states.PlayerOne.health < 0 ? 0 : states.PlayerOne.health;
          healthBarFirst.style.width = (100 * states.PlayerOne.health) / firstFighter.health + '%';
          states.PlayerTwo.lastTimeSuperHit = new Date();
        }
        pressedKeysSuperHitSecond.clear();
      }

      if (states.PlayerOne.health <= 0) {
        resolve(secondFighter);
      } else if (states.PlayerTwo.health <= 0) {
        resolve(firstFighter);
      }
    });

    document.addEventListener('keyup', function (event) {
      const currentAction = event.code;

      switch (currentAction) {
        case controls.PlayerOneBlock:
          states.PlayerOne.IsBlocking = false;
          break;

        case controls.PlayerTwoBlock:
          states.PlayerTwo.IsBlocking = false;
          break;

        default:
          break;
      }

      if ([...pressedKeysSuperHitFirst].some((it) => it == currentAction)) {
        pressedKeysSuperHitFirst.delete(currentAction);
      } else if ([...pressedKeysSuperHitSecond].some((it) => it == currentAction)) {
        pressedKeysSuperHitSecond.delete(currentAction);
      }
    });
  });
}

function CanSuperHit(lastTimeSuperHit) {
  return lastTimeSuperHit ? Math.floor((new Date() - lastTimeSuperHit) / 1000) > 10 : true;
}

export function getDamageSuperHit(fighter) {
  // return hit power
  const { attack } = fighter;
  return 2 * attack;
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
