export const PRODUCTS = [
  { id: 'p1',  name: 'Aurora Wireless Headphones', category: 'Audio',     price: 12900, emoji: '🎧', blurb: '40h battery, adaptive noise cancelling.', t1: '#e8f3ef', t2: '#c9e6dc' },
  { id: 'p2',  name: 'Nimbus Mechanical Keyboard', category: 'Desk',      price: 8900,  emoji: '⌨️', blurb: '75% layout, hot-swap tactile switches.', t1: '#eef0f7', t2: '#d5daee' },
  { id: 'p3',  name: 'Solstice Ceramic Mug',       category: 'Home',      price: 1850,  emoji: '☕', blurb: 'Stoneware, 350ml, dishwasher safe.',    t1: '#fbf1e6', t2: '#f0dcc4' },
  { id: 'p4',  name: 'Drift Linen Throw',          category: 'Home',      price: 6400,  emoji: '🛋️', blurb: 'Washed European linen, 130×170cm.',     t1: '#f6efe9', t2: '#e6d8c9' },
  { id: 'p5',  name: 'Pebble Bluetooth Speaker',   category: 'Audio',     price: 5400,  emoji: '🔊', blurb: 'Pocket-sized, IPX7 waterproof.',        t1: '#e9f2f6', t2: '#cbe2ec' },
  { id: 'p6',  name: 'Vertex Fitness Watch',       category: 'Wearables', price: 14900, emoji: '⌚', blurb: 'GPS, HR, 9-day battery life.',           t1: '#eef1ee', t2: '#d3ddd4' },
  { id: 'p7',  name: 'Halo Desk Lamp',             category: 'Desk',      price: 4200,  emoji: '💡', blurb: 'Warm dimmable LED, USB-C powered.',      t1: '#fdf6e3', t2: '#f4e6bd' },
  { id: 'p8',  name: 'Tidewater Water Bottle',     category: 'Outdoors',  price: 2600,  emoji: '🥤', blurb: 'Insulated steel, 750ml, 24h cold.',      t1: '#e7f4f7', t2: '#c4e6ee' },
  { id: 'p9',  name: 'Ember Cast Iron Pan',        category: 'Kitchen',   price: 3800,  emoji: '🍳', blurb: '26cm pre-seasoned skillet.',             t1: '#f2ecea', t2: '#dccbc6' },
  { id: 'p10', name: 'Zephyr Travel Backpack',     category: 'Outdoors',  price: 9800,  emoji: '🎒', blurb: '28L, laptop sleeve, weatherproof.',      t1: '#eaeef6', t2: '#ccd6ea' }
]

export const FREE_SHIPPING_AT = 10000  // cents
export const FLAT_SHIPPING = 695       // cents
export const TAX_RATE = 0.08

export const COUNTRIES = ['Malaysia', 'Singapore', 'Australia', 'United Kingdom', 'United States']

export function money(cents) {
  return '$' + (cents / 100).toFixed(2)
}
