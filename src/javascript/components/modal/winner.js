import {showModal} from './modal';
import {createElement} from '../../helpers/domHelper';

export function showWinnerModal(fighter) {
  // call showModal function
  const title = `${fighter.name} wins!`;
  const body = createElement({ tagName: 'p', className: 'modal-body' });
  body.innerText = "My congratulations to you! Welcome to the next fight!";
  const result = {
    title,
    bodyElement: body,
    onClose: () => {
      console.log(name);
      window.location.reload();
    },
  };
  showModal(result);
}

