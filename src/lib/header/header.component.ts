import { Component, OnInit, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

export enum HeaderGroup {
  left = 'left',
  center = 'center',
  right = 'right'
}

export enum HeaderItemType {
  link = 'link'
  // dropdown = 'dropdown'
}

export interface HeaderBaseLinkParams {
  classes?: string[];
}

export interface HeaderPathLinkParams {
  path: string;
}

export interface HeaderEventLinkParams {
  event: (event: any) => any;
}

export interface HeaderNamedLinkParams {
  name: string;
  icon?: string;
}

export interface HeaderWrapperLinkParams {
  innerHtml: string | SafeHtml;
}

export interface HeaderLogoLinkParams {
  imgPath: string;
}

export type HeaderNamedPathLinkParams = HeaderBaseLinkParams &
  HeaderPathLinkParams &
  HeaderNamedLinkParams;

export type HeaderWrapperPathLinkParams = HeaderBaseLinkParams &
  HeaderPathLinkParams &
  (HeaderWrapperLinkParams | HeaderLogoLinkParams);

export type HeaderNamedEventLinkParams = HeaderBaseLinkParams &
  HeaderEventLinkParams &
  HeaderNamedLinkParams;

export type HeaderWrapperEventLinkParams = HeaderBaseLinkParams &
  HeaderEventLinkParams &
  HeaderWrapperLinkParams;

export type HeaderLinkParams =
  | HeaderNamedPathLinkParams
  | HeaderWrapperPathLinkParams
  | HeaderNamedEventLinkParams
  | HeaderWrapperEventLinkParams
  | HeaderLogoLinkParams;

export interface HeaderOptionalPathLinkParams {
  path?: string;
}

export interface HeaderOptionalEventLinkParams {
  event?: (event: any) => any;
}

// export type HeaderItemParams = HeaderLinkParams | HeaderDropdownParams;
export type HeaderItemParams = HeaderLinkParams;

export interface HeaderItem {
  type: HeaderItemType;
  group: HeaderGroup;
  params: HeaderItemParams;
}

export enum HeaderFixed {
  Fixed = 'fixed', // default
  Float = 'float'
}

export enum HeaderTheme {
  Default = 'default',
  Inverse = 'inverse'
}

export enum HeaderBackground {
  Default = 'default',
  Primary = 'primary',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger'
}

export interface HeaderConfiguration {
  attachment?: HeaderFixed;
  theme?: HeaderTheme;
  background?: HeaderBackground;
}

@Component({
  selector: 'spr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  public headerItems: HeaderItem[];

  @Input()
  private _headerConfiguration: HeaderConfiguration;
  public get headerConfiguration(): HeaderConfiguration {
    return this._headerConfiguration;
  }

  @Input('headerConfiguration')
  public set headerConfiguration(value: HeaderConfiguration) {
    this._headerConfiguration = value;
    this.headerUpdate();
  }

  public headerTheme = '';
  public headerBackground = '';
  public headerAttachment = '';

  public headerLeft: HeaderItem[];
  public headerCenter: HeaderItem[];
  public headerRight: HeaderItem[];

  ngOnInit() {
    if (!!this.headerItems) {
      this.headerLeft = this.headerItems.filter(
        items => items.group === HeaderGroup.left
      );
      this.headerCenter = this.headerItems.filter(
        items => items.group === HeaderGroup.center
      );
      this.headerRight = this.headerItems.filter(
        items => items.group === HeaderGroup.right
      );
    }
  }

  public headerUpdate(): void {
    if (!!this.headerConfiguration) {
      this.headerTheme = !!this.headerConfiguration.theme
        ? `c-header-${this.headerConfiguration.theme}`
        : '';
      this.headerAttachment = !!this.headerConfiguration.attachment
        ? `c-header-${this.headerConfiguration.attachment}`
        : '';
      this.headerBackground = !!this.headerConfiguration.background
        ? `c-bg-${this.headerConfiguration.background}`
        : '';
    }
  }
}
