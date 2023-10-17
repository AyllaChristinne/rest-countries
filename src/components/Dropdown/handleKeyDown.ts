/* eslint-disable quotes */
import { Dispatch, RefObject, SetStateAction } from "react";

export function handleKeyDown(
  event: KeyboardEvent,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  menuRef: RefObject<HTMLDivElement>
) {
  event.stopPropagation();
  const { key } = event;
  const dropdown = menuRef.current;
  if (!dropdown) return;

  const items: Array<HTMLButtonElement> = Array.from(
    dropdown.querySelectorAll('[data-item="dropdown-item"]')
  );

  const selectedItem: HTMLButtonElement | null = dropdown.querySelector(
    '[aria-selected="true"]'
  );

  if (!selectedItem) {
    selectItem(items[0]);
  }

  switch (key) {
    case "Down":
    case "ArrowDown": {
      event.preventDefault();
      const currentIndex = items.indexOf(selectedItem as HTMLButtonElement);
      const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;

      selectItem(items[nextIndex]);
      break;
    }

    case "Up":
    case "ArrowUp": {
      event.preventDefault();
      const currentIndex = items.indexOf(selectedItem as HTMLButtonElement);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;

      selectItem(items[prevIndex]);
      break;
    }

    case " ":
    case "Enter": {
      event.preventDefault();
      const currentIndex = items.indexOf(selectedItem as HTMLButtonElement);

      if (currentIndex !== -1) {
        selectedItem?.click();
      }
      setIsOpen(false);
      break;
    }

    case "Esc":
    case "Escape":
    case "Tab": {
      event.preventDefault();
      setIsOpen(false);
      break;
    }

    case "Home":
    case "PageUp": {
      event.preventDefault();
      selectItem(items[0]);
      break;
    }

    case "End":
    case "PageDown": {
      event.preventDefault();
      selectItem(items[items.length - 1]);
      break;
    }

    default:
      break;
  }
}

function selectItem(item: HTMLButtonElement) {
  resetSelect(item);
  item.setAttribute("aria-selected", "true");
}

function resetSelect(item: HTMLElement) {
  const items = item.parentElement?.parentElement?.querySelectorAll("button");

  items?.forEach((item) => {
    item.setAttribute("aria-selected", "false");
  });
}
