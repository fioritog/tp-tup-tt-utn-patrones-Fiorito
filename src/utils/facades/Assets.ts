import { Asset } from "../../models/AssetModel";
import { InMemoryStorage } from "../storage";

export class AssetFacade {
  constructor(private storage: InMemoryStorage) {}

  getAllAssets(): Asset[] {
    return this.storage.getAllAssets();
  }

  getAssetBySymbol(symbol: string): Asset | undefined {
    return this.storage.getAssetBySymbol(symbol);
  }

  updateAsset(asset: Asset): void {
    this.storage.updateAsset(asset);
  }
}
