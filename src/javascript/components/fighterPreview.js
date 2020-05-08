import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  // todo: show fighter info (image, name, health, etc.)
  const {name, health, attack, defense} = fighter;

  const fighterImage = createFighterImage(fighter);
  const fighterProps = createElement({
    tagName: 'div',
    className: `fighter-props`,
  });
  fighterProps.innerHTML = `
  <p>name: <span>${name}</span></p>
  <p>health: <span>${health}</span></p>
  <p>attack: <span>${attack}</span></p>
  <p>defense: <span>${defense}</span></p>
  `;

  fighterElement.append(fighterImage, fighterProps);
  

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
