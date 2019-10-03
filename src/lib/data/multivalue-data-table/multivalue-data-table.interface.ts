export interface IMultivalueDataRowConfig {
  isBold?: boolean;
  isItalic?: boolean;
  customValueClasses?: string[];
  customHeaderClasses?: string[];
}

export interface IMultivalueDataRow {
  label: string;
  values?: string[];
  children?: IMultivalueDataRow[];
  config?: IMultivalueDataRowConfig;
  level?: number;
}
