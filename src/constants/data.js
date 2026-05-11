/* Data Constants */

export const PRODUCTS = [
  { id:1, category:"Luxury",    name:"Luminous Silk Foundation", brand:"Giorgio Armani", match:98,
    img:"https://lh3.googleusercontent.com/aida-public/AB6AXuCEhRwZEgBQBE5D2RUXfEDOfQuRlz8xVHKiT2ADpfwhI05kFZK2yTFOxwTsIi82DmE5U98GbuwDbZCpeqdw_UhsOBi7ZDQWGlB41xwkpB8p0DwSjLTSATwE0uDoiQ7d_ZqCdrVrwP8JhvYi6X9VEcp90uc6IIX5Lv7nTRjKPt-Ki1I693mXXdaQHw7aFOVxOnCPxtTfqpdA_d5H-J0bM1-KS31oTZy0FyW87pHfnhIAlxK1QD9KIuhb09Hi54gkuzEUrM3Wkw03zBw" },
  { id:2, category:"Drugstore", name:"Hydrating Concealer",       brand:"Neutrogena",    match:95,
    img:"https://lh3.googleusercontent.com/aida-public/AB6AXuCfwsm2f8nNBG7QCNQD4VlK32xNdlLSIITJDtq2LOlg2tYX2w0ZlZbmED0CgXbSJaSo43j5ciBeLHP-CSaNm5DS2lfxMZba13JNnkqH-CHccblOfngeWxuOvT4O9MPl2Y4e83eUoQwJ6upfB1WnJjfEiD99H_5thD7ncyq71cauyolV3AP_1t5_TzCbSqjq5HQczCkzx4WxhpmV5RMzgNC8Am-y0Yh4wTBQPPYZATT-cFxwQWI3OlKIPW5eG9LN7nq9KARREKw-FsM" },
  { id:3, category:"Luxury",    name:"Advanced Night Repair",     brand:"Estée Lauder",  match:92,
    img:"https://lh3.googleusercontent.com/aida-public/AB6AXuDiBskHRio-WPWOIJ124WzdhZnU0tSOv6lrQiK9v3uxQOWUu9e7A7txBXH9vAsoCFZffSZY8ephJnHQ3yNSz0t2pNsSX8I-ebsPfT0sHRSXwTn7Noh3EMMY4QtyTNefo5DXwyYYLc1HcnZWKFY8mu2hK2OEhZe1lTV2X74qSxslEeVZNyzllGOEOz10UlFCloIGe-ofNaZGrWxlCmSNPodyC4A5Sxy8eo25NWWTdApVd6FKIl-WiOQ-iEC29hCjHIXbWKeJSIkSRRfc" },
  { id:4, category:"Drugstore", name:"True Match Foundation",     brand:"L'Oréal Paris", match:89,
    img:"https://lh3.googleusercontent.com/aida-public/AB6AXuCEhRwZEgBQBE5D2RUXfEDOfQuRlz8xVHKiT2ADpfwhI05kFZK2yTFOxwTsIi82DmE5U98GbuwDbZCpeqdw_UhsOBi7ZDQWGlB41xwkpB8p0DwSjLTSATwE0uDoiQ7d_ZqCdrVrwP8JhvYi6X9VEcp90uc6IIX5Lv7nTRjKPt-Ki1I693mXXdaQHw7aFOVxOnCPxtTfqpdA_d5H-J0bM1-KS31oTZy0FyW87pHfnhIAlxK1QD9KIuhb09Hi54gkuzEUrM3Wkw03zBw" },
  { id:5, category:"Luxury",    name:"Pro Filt'r Soft Matte",    brand:"Fenty Beauty",  match:87,
    img:"https://lh3.googleusercontent.com/aida-public/AB6AXuCfwsm2f8nNBG7QCNQD4VlK32xNdlLSIITJDtq2LOlg2tYX2w0ZlZbmED0CgXbSJaSo43j5ciBeLHP-CSaNm5DS2lfxMZba13JNnkqH-CHccblOfngeWxuOvT4O9MPl2Y4e83eUoQwJ6upfB1WnJjfEiD99H_5thD7ncyq71cauyolV3AP_1t5_TzCbSqjq5HQczCkzx4WxhpmV5RMzgNC8Am-y0Yh4wTBQPPYZATT-cFxwQWI3OlKIPW5eG9LN7nq9KARREKw-FsM" },
  { id:6, category:"Drugstore", name:"Fit Me Matte + Poreless",  brand:"Maybelline",    match:84,
    img:"https://lh3.googleusercontent.com/aida-public/AB6AXuDiBskHRio-WPWOIJ124WzdhZnU0tSOv6lrQiK9v3uxQOWUu9e7A7txBXH9vAsoCFZffSZY8ephJnHQ3yNSz0t2pNsSX8I-ebsPfT0sHRSXwTn7Noh3EMMY4QtyTNefo5DXwyYYLc1HcnZWKFY8mu2hK2OEhZe1lTV2X74qSxslEeVZNyzllGOEOz10UlFCloIGe-ofNaZGrWxlCmSNPodyC4A5Sxy8eo25NWWTdApVd6FKIl-WiOQ-iEC29hCjHIXbWKeJSIkSRRfc" },
];

export const TUTORIAL_STEPS = [
  { step:1, title:"Apply Foundation", desc:"Start from the center of your face and blend outward using circular motions.", zone:"Center Face" },
  { step:2, title:"Contour Cheekbones", desc:"Follow the natural shadow beneath your cheekbones. Blend upward toward temples.", zone:"Cheeks" },
  { step:3, title:"Highlight T-Zone", desc:"Apply highlighter to the bridge of your nose and center of forehead.", zone:"T-Zone" },
  { step:4, title:"Set with Powder", desc:"Lightly dust translucent powder to lock your look and control shine.", zone:"Full Face" },
];

export const ROUTINE = [
  { time:"07:00 AM", label:"Cleanser", done:true },
  { time:"07:10 AM", label:"Moisturizer SPF 30", done:true },
  { time:"07:20 AM", label:"Foundation — 3.5 Natural", done:false },
  { time:"07:30 AM", label:"Concealer — Classic Ivory", done:false },
  { time:"08:00 AM", label:"Setting Spray", done:false },
];

export const NAV_ITEMS = [
  { id:"home",      icon:"home",      label:"Home" },
  { id:"scan",      icon:"scan",      label:"Scan" },
  { id:"shop",      icon:"shop",      label:"Shop" },
  { id:"tutorials", icon:"tutorials", label:"Studio" },
  { id:"vanity",    icon:"vanity",    label:"Vanity" },
];
