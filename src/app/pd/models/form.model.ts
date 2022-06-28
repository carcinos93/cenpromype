

export class inputBase<T> {
  value: T|undefined;
  key: string;
  objectKey: string;
  label: string;
  required: boolean;
  validators: [];
  order: number;
  controlType: string;
  type: string;
  defaultValue: any;
  onchange: (value: any) => void;
  constructor(options: {
    value?: T;
    key?: string;
    objectKey?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: string;
    type?: string;
    defaultValue?: any;
    validators?: [];
    onchange?: (...value: any) => void
  } = {  }) {

   this.onchange = options.onchange || function (...value) {};
  this.objectKey = options.objectKey || '';
  this.value = options.value;
  this.key = options.key || '';
  this.label = options.label || '';
  this.required = !!options.required;
  this.order = options.order === undefined ? 1 : options.order;
  this.controlType = options.controlType || '';
  this.type = options.type || '';
  this.defaultValue = options.defaultValue;
  this.validators = options.validators || [];
}
}

export class TextboxForm extends inputBase<string> {
  controlType = 'textbox';
  isTextArea: boolean = false;
  constructor(options: any, o: { isTextArea?: boolean } = {})
  {
    super(options);
    this.isTextArea = o.isTextArea || false;
  }
}

export class HiddenForm extends inputBase<string> {
  controlType = 'hidden';
  constructor(options: any)
  {
    super(options);
  }
}

export class CalendarForm extends inputBase<string> {
  controlType = 'calendar';
  view: string;
  format: string;

  constructor(options: any, o: { view?: string, format?: string } = {})
  {
    super(options);
    this.format = o.format || "dd/MM/yyyy";
    this.view = o.view || "date";
  }
}

export class TextNumberForm extends inputBase<string> {
  controlType = 'number';
  minFractionDigits: number;
  constructor(options: any, o: { minFractionDigits?: number  } = {}) {
    super(options);
    this.minFractionDigits = o.minFractionDigits || 0;
  }
}

export class PasswordForm extends inputBase<string> {
  controlType = 'password';
}

export class EditorForm extends inputBase<string> {
  controlType = 'editor';
  style: any = {};
  command: command;
  saveFile: boolean = false;
  maxLoadSizeMb: number = 5;
  constructor(options: any, o: { style?: any, command?: command, saveFile?: boolean, maxLoadiSizeMb?: number  } = {}) {
    super(options);
    this.style = o.style || {};
    this.maxLoadSizeMb = o.maxLoadiSizeMb ?? 5;
    this.saveFile = o.saveFile ?? false;
    this.command = o.command || { name: "default",  event: () => {} };
  }
}
export class CheckBoxForm extends  inputBase<any> {
  controlType = 'checkbox';
  trueValue: any;
  falseValue: any;
  constructor(options: any, o: { trueValue?: any, falseValue?: any } = {}) {
    super(options);
    this.trueValue = o.trueValue ?? true;
    this.falseValue = o.falseValue ?? false;
  }
}

export class DropdownForm extends inputBase<string> {
  controlType = 'dropdown';
  items: any[];
  options: { optionLabel: string, optionValue: string };
  dataSource: string;
  constructor(options: any, o: { items?: any[], options?: { optionLabel: string, optionValue: string }, dataSource?: string} = {})
  {
      super(options);
      this.items = o.items || [];
      this.options = o.options || { optionLabel: 'descripcion', optionValue: 'id' };
      this.dataSource = o.dataSource || "";
      //this.defaultValue = o.defaultValue;
  }
}

export class FileForm extends inputBase<any> {
  controlType = 'file';
  accept: string;
  constructor(options: any, o: { accept?: string } = {}) {
        super(options);
        this.accept = o.accept ?? "";
   }
}


export class FileUploader extends inputBase<any> {
  controlType = 'file-uploader';
  multiple: boolean;
  accept: string;
  constructor(options: any, o: { accept?: string, multiple?: boolean } = {}) {
        super(options);
        this.accept = o.accept ?? "";
        this.multiple = o.multiple ?? false;
   }
}

export class DetailForm  {
  controlType = 'detail';
  label: string;
  key: string;
  order: number;
  config: any;
  llavesForaneas: any;
  required: boolean;
  constructor(options: {
    label?: string;
    order?: number; 
    config?: any;
    llavesForeas?: any;
    key?: string;
  }) 
  {
    this.label = options.label || '';
    this.key = options.key || '';
    this.order = options.order === undefined ? 1 : options.order;
    this.config = options.config || { controls: [], commands: [], dataTable: { columns: [] } } as any;
    this.llavesForaneas = options.llavesForeas || {};
    this.required = false;
  }
 
}

export interface configFormBuild {
  controls: any[];
  selectionMode: "single" | "multi",
  allowSelection: boolean,
  commands: command[];
  filters: any[];
  multi: boolean;
  primaryKey: { column: string, key: string  };
  updateRoute: string;
  insertRoute: string;
  dataRoute: any;
  recuperarRoute: string,
  dataTable: {
    columns: any[];
    casts: any
  },
  botonesEstado: any;
  //columnas: string[];
}

export interface command {
   name: string;
   event: (...args: any) => void;

}
