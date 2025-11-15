export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private updateAgedBrie(item: Item) {
    if (item.quality < 50) {
      item.quality += 1;
    }
  }

  private updateBackstagePasses(item: Item) {
    if (item.quality >= 50) {
      return;
    }

    if (item.sellIn < 6) {
      item.quality = Math.min(50, item.quality + 3);
    } else if (item.sellIn < 11) {
      item.quality = Math.min(50, item.quality + 2);
    } else {
      item.quality += 1;
    }
  }

  private updateRegularItem(item: Item) {
    if (item.quality > 0) {
      item.quality -= 1;
    }
  }

  private updateExpiredItem(item: Item) {
    if (item.name === AGED_BRIE) {
      this.updateAgedBrie(item);
    } else if (item.name === BACKSTAGE_PASSES) {
      item.quality = 0;
    } else if (item.name !== SULFURAS) {
      this.updateRegularItem(item);
    }
  }

  updateQuality() {
    for (const item of this.items) {
      // Skip Sulfuras entirely
      if (item.name === SULFURAS) {
        continue;
      }

      // Update quality based on item type (before expiration)
      if (item.name === AGED_BRIE) {
        this.updateAgedBrie(item);
      } else if (item.name === BACKSTAGE_PASSES) {
        this.updateBackstagePasses(item);
      } else {
        this.updateRegularItem(item);
      }

      // Decrease sellIn
      item.sellIn -= 1;

      // Handle expired items
      if (item.sellIn < 0) {
        this.updateExpiredItem(item);
      }
    }

    return this.items;
  }
}
