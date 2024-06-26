import { CSSResult } from "lit";
import { toDashedString } from "./utils";
import { FunctionalLitComponent, Hooks } from "./hooks";
import BaseElement from "./base-element";
import { Props, generateProps } from "./props";


export default function component(fn: Function, styles: CSSResult[] = []): void {
  const componentName = toDashedString(fn.name);

  if (customElements.get(componentName)) {
    return;
  }

  const hooks: Hooks = new Hooks();
  const props: Props = generateProps(hooks);

  class ComponentClass extends BaseElement {
    constructor() {
      super();

      hooks.litElement = this as unknown as FunctionalLitComponent;
    }

    render() {
      return fn.call(this, props);
    }

    static get styles() {
      return styles
    }
  }

  hooks.LitClass = ComponentClass;

  customElements.define(componentName, ComponentClass);
}