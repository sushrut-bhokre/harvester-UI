//@ts-nocheck
import { CoreStoreSpecifics, CoreStoreConfig } from "@shell/core/types";
import { SteveFactory, steveStoreInit } from "@shell/plugins/steve/index";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const harvesterFactory = (): CoreStoreSpecifics => {
  const steveFactory = SteveFactory(null, null);

  steveFactory.getters = { ...steveFactory.getters, ...getters };
  steveFactory.mutations = { ...steveFactory.mutations, ...mutations };
  steveFactory.actions = { ...steveFactory.actions, ...actions };

  // Force allowStreaming to false to ensure WebSocket messages are processed in the main thread
  // where our interceptors are active.
  const originalState = steveFactory.state;
  steveFactory.state = function () {
    return {
      ...originalState(),
      allowStreaming: false
    };
  };

  // Wrap the subscribe action to handle WebSocket messages seamlessly
  const originalSubscribe = steveFactory.actions.subscribe;
  steveFactory.actions.subscribe = async function (ctx: any, ...args: any[]) {
    const result = await originalSubscribe.call(this, ctx, ...args);

    const socketWrapper = ctx.state?.socket;
    if (socketWrapper && !socketWrapper.__harvesterWrapped) {
      socketWrapper.__harvesterWrapped = true;
      const originalDispatchEvent = socketWrapper.dispatchEvent;

      socketWrapper.dispatchEvent = function (event: any) {
        if (event.type === 'message') {
          const msgEvent = event.detail;
          const hasGroup = typeof msgEvent?.data === 'string' && msgEvent.data.includes('harvesterhci.io');

          if (hasGroup) {
            try {
              const translatedData = msgEvent.data.replace(/harvesterhci\.io/g, 'zeushci.io');

              if (translatedData.includes('virtualmachineimage')) {
                console.log(`[ZEUS] Web Event TRACE (Translated): ${translatedData.substring(0, 200)}...`);
              }

              const newMsgEvent = new MessageEvent('message', {
                data: translatedData,
                origin: msgEvent.origin,
                lastEventId: msgEvent.lastEventId,
                source: msgEvent.source,
                ports: msgEvent.ports as any,
              });

              const newEvent = new CustomEvent('message', { detail: newMsgEvent });
              return originalDispatchEvent.call(this, newEvent);
            } catch (e) {
              console.error('[ZEUS] Web Event translation error:', e);
            }
          } else if (msgEvent?.data?.includes?.('virtualmachineimage')) {
            console.log(`[ZEUS] Web Event TRACE (Untranslated Image): ${msgEvent.data.substring(0, 100)}`);
          }
        }
        return originalDispatchEvent.call(this, event);
      };
    }

    return result;
  };

  return steveFactory;
};

const harvesterStoreInit = (store: any, ctx: any) => {
  steveStoreInit(store, ctx);

  if (store.$axios && !store.$axios.__harvesterInterceptorAdded) {
    store.$axios.__harvesterInterceptorAdded = true;

    store.$axios.onRequest((config: any) => {
      if (config?.url && config.url.includes('zeushci.io')) {
        config.url = config.url.replace(/zeushci\.io/g, 'harvesterhci.io');
        console.log(`[ZEUS] Request URL: ${config.url}`);
      }

      if (config?.data && typeof config.data === 'object') {
        try {
          const json = JSON.stringify(config.data);
          if (json.includes('zeushci.io')) {
            config.data = JSON.parse(json.replace(/zeushci\.io/g, 'harvesterhci.io'));
            console.log('[ZEUS] Request Data Translated');
          }
        } catch (e) { }
      }
      return config;
    });

    store.$axios.onResponse((response: any) => {
      if (response?.data && typeof response.data === 'object') {
        try {
          const json = JSON.stringify(response.data);
          if (json.includes('harvesterhci.io')) {
            const translatedJson = json.replace(/harvesterhci\.io/g, 'zeushci.io');
            response.data = JSON.parse(translatedJson);
            console.log(`[ZEUS] Response Data Translated: ${response.config.url}`);

            // Targeted debug for addon schema
            if (response.config.url.endsWith('schemas') && translatedJson.includes('zeushci.io.addon')) {
              console.log('[ZEUS] zeushci.io.addon schema found and translated!');
            }
          }
        } catch (e) { }
      }
      return response;
    });
  }
};

const config: CoreStoreConfig = {
  namespace: 'harvester',
  isClusterStore: true
};

export default {
  specifics: harvesterFactory(),
  config,
  init: harvesterStoreInit
};
