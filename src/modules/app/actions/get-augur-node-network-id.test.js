import { getAugurNodeNetworkId } from "modules/app/actions/get-augur-node-network-id";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as augur from "services/augurjs";

jest.mock("../../../services/augurjs.js");

describe("modules/app/actions/get-augur-node-network-id.js", () => {
  let store;
  afterEach(() => {
    store.clearActions();
    jest.resetModules();
  });

  test("augur-node network id already in state", done => {
    store = configureMockStore([thunk])({
      connection: { augurNodeNetworkId: "4" }
    });
    augur.augurNode.mockGetSyncData = expect.toThrowErrorMatchingSnapshot();
    store.dispatch(
      getAugurNodeNetworkId((err, augurNodeNetworkId) => {
        expect(err).toBeNull();
        expect(augurNodeNetworkId).toStrictEqual("4");
        expect(store.getActions()).toEqual([]);
        done();
      })
    );
  });

  test("fetch network id from augur-node", done => {
    store = configureMockStore([thunk])({
      connection: { augurNodeNetworkId: null }
    });
    augur.augurNode.mockGetSyncData = callback =>
      callback(null, { net_version: "4" });
    store.dispatch(
      getAugurNodeNetworkId((err, augurNodeNetworkId) => {
        expect(err).toBeNull();
        expect(augurNodeNetworkId).toStrictEqual("4");
        expect(store.getActions()).toEqual([
          {
            type: "UPDATE_AUGUR_NODE_NETWORK_ID",
            augurNodeNetworkId: "4"
          }
        ]);
        done();
      })
    );
  });
});
