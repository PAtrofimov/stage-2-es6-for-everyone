import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  // todo: show fighter info (image, name, health, etc.)

  if (!fighter) {
    throw new Error('Select second player');
  }

  const { name, health, attack, defense } = fighter;
  const fighterImage = createFighterImage(fighter);
  const fighterProps = createElement({
    tagName: 'div',
    className: `fighter-props`,
  });

  fighterProps.innerHTML = `
  <h1 class = 'fighter-name fighter-name-${position}'>${name}</h1>
  <div>health: <span class = 'fighter-prop fighter-health'>${health}</span></div>
  <div>attack: <span class = 'fighter-prop fighter-attack'>${attack}</span></div>
  <div>defense: <span class = 'fighter-prop fighter-defense'>${defense}</span></div>
  `;
  fighterElement.append(fighterImage, fighterProps);

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name,
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
