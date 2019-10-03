import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[sprPopup]'
})
export class PopupDirective {
  @Input() sprPopup: IPopup;

  @HostListener('click', ['$event']) onClick($event) {
    this.openPopup(this.sprPopup);
  }

  public openPopup(popup: IPopup) {
    const left = (screen.width / 2) - (popup.settings.width / 2);
    const top = (screen.height / 2) - (popup.settings.height / 2);

    const settings = `
    resizable=${Number(popup.settings.resizable)},
    scrollbars,
    height=${popup.settings.height},
    width=${popup.settings.width},
    top=${top},
    left=${left}`;

    const newwindow = window.open(popup.url, popup.name, settings);

    if (window.focus && newwindow) { newwindow.focus(); }
    return false;
  }

}

export interface IPopup {

  name: string;
  url: string;
  settings: PopupSettings;

}

export class PopupSettings {

  public static defaultSettings = {
    resizable: true,
    height: 600,
    width: 800,
  };

  public resizable: boolean;
  public height: number;
  public width: number;
}
