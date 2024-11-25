type HookCallback = (data: any) => Promise<void> | void;

class Plugin {
  private name: string;
  private hooks: Record<string, HookCallback[]>;

  constructor(name: string) {
    this.name = name;
    this.hooks = {};
  }

  registerHook(hookName: string, callback: HookCallback) {
    if (!this.hooks[hookName]) {
      this.hooks[hookName] = [];
    }
    this.hooks[hookName].push(callback);
  }

  async executeHook(hookName: string, data: any) {
    if (this.hooks[hookName]) {
      for (const callback of this.hooks[hookName]) {
        await callback(data);
      }
    }
  }
}

export default Plugin;