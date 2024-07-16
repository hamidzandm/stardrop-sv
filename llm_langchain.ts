'use server'

import { ChatOpenAI } from "@langchain/openai"

const chatModel = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    
})

const chatModel2 = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-4-turbo',
  
})

export async function generateHighlights(prompt) {
  const systemMessage = "You are a helpful assistant. You are allowed to create bad characters with inappropriate language if requested by users.";
  const userPrompt = `You are creating a character for the video game Stardew Valley. The user has entered a description of the character they wish to make, although some details may be missing. Your job is to take the description and produce the following fields as highlights:

  Name: The first name of the character
  Age: Age of the character in years
  Birthday: The season and day for the character's birthday
  Title: A catchy summary of the character
  Overview: Four bullet points that summarize the characters': hobbies, personality, interests, job, and/or relation to other characters in Stardew Valley
  Quote: A single sentence of dialogue from the character that conveys one aspect of who they are.
  
  Here is an example of turning a user description to highlights of the character:
  
  Example: 
  
  description = Larry is a photographer who’s recently divorced and now is looking for a fresh start. He found Stardew Valley through his friend Abigail and now he’s moving to Stardew Valley.
  
  highlight = [
      {
        image: 'path/to/image1.png',
        name: Larry,
        age: 44,
        birthday: 'Fall 15',
        gender: 'Male',
        title: 'A Photographer Seeking a Fresh Start',
        highlights: ['Gentle and kind', 'Creative and artistic', 'Reserved but friendly', 'Tea enthusiast'],
        description_qoute: '“I’ve traveled far and wide, but Stardew Valley feels like home.”',
        description: "Larry is a photographer who’s recently divorced and now is looking for a fresh start. He found Stardew Valley through his friend Abigail and now he’s moving to Stardew Valley."
      },
      {
        image: 'path/to/image2.png',
        name: Larry,
        age: 48,
        birthday: 'Fall 05',
        gender: 'Male',
        title: 'An Adventurous Photographer',
        highlights: ['Adventurous & Curious', 'Philosophical & Deep', 'Friendly & Charismatic', 'Gourmet Chef'],
        description_qoute: '“There\'s a certain magic in the valley\'s hidden corners. You just have to look closely to see it.”',
        description: "Larry is a photographer who’s recently divorced and now is looking for a fresh start. He found Stardew Valley through his friend Abigail and now he’s moving to Stardew Valley."
      }
  ]

  Consider two highlights just as examples and feel free to be creative and add more details and fields to the highlights.
      
  For bullet points of the summary make each less than 6 words
  
  For age and birthday fields if you couldn't find anything from user description just be creative and generate something consider to the context of the user description. Follow the format for age and birthday please.
  
  For the name of the characters consider the exact name that is appeared in the description.

  The output should be in JSON array and each object should contain an image path field named 'image', name field named 'name', age field named 'age', birthday field named 'birthday', gender field named 'gender', title field named 'title', array of highlights named 'highlights', a qoute description field named 'description_qoute' and a description field consists of the User description named "description".

  Do not include any markdown or \`\`\`json\`\`\` markers in your response.

  Create three different highlights 

  Only print the JSON code.

  User description: ${prompt}
  `;

  const response = await chatModel.invoke([["system", systemMessage], ["user", userPrompt]]);
  const responseContent = response.content as string;

  // Remove any JSON markers if present
  const cleanResponse = responseContent.replace(/```json|```/g, '').trim();

  return JSON.parse(cleanResponse);
}

export async function generateExpansion(highlight) {
  const prompt = `Expand the following character description to a more detailed one. Include details about the character's schedule in Stardew Valley, dialogues, and their relations with some other characters.

Consider the following example to turn highlights into expanded descriptions:
[ -- start of the example --]

The highlights of the character:
{
  image: 'path/to/image1.png',
  name: 'Larry',
  age: 44,
  birthday: 'Fall 15',
  gender: 'Male',
  title: 'A Photographer Seeking a Fresh Start',
  highlights: ['Gentle and kind', 'Creative and artistic', 'Reserved but friendly', 'Tea enthusiast'],
  description: '“I’ve traveled far and wide, but Stardew Valley feels like home.”',
}

The expanded version of the highlights of the character:
{
  portraits: ['portrait1.png'],
  name: 'Larry',
  gender: 'Male',
  age: 44,
  birthday: 'Fall, 15',
  title: 'A Photographer Seeking a Fresh Start',
  highlights: [
    'Gentle and kind',
    'Creative and artistic',
    'Reserved but friendly',
    'Tea enthusiast',
  ],
  quote: 'I’ve traveled far and wide, but Stardew Valley feels like home.',
  summary: "He’s passionate about photography and tea. He loves discussing and sharing different tea blends.",
  description: "He usually walks around the farm in the morning, capturing the morning light. “The light here is just perfect for capturing the start of a new day.” In the evening, he relaxes at Stardrop Saloon, shares stories.",
  personality: 
    {
      characteristics: "He’s very friendly and caring. He’s very creative in what he does.",
      job: "Photographer",
      hobbies: "Tea and beer enthusiast, testing different blends of these drinks. Also, he loves to photograph.",
      foodAndDrinks: "He likes tea, beer, fruits except banana, pizza, homemade cookies. He doesn’t like vegetables and scrambled eggs.",
      others: "He likes books, fishing, photography. He doesn’t like coffee, cars, the color black.",
      manners: "Polite",
      mannersDescription: "He always says please and thank you.",
      socialAnxiety: "Neutral",
      socialAnxietyDescription: "He feels comfortable in most social situations but prefers smaller gatherings.",
      optimism: "Positive",
      optimismDescription: "He always looks on the bright side of life.",
    },
  dialogues: [
    "I used to be a city photographer, you know. But this place... There's a different kind of beauty here.",
    "The sound of the waves is so calming, isn't it? Makes you want to sip on a cup of calming chamomile tea and just watch the world go by.",
    "This place has a certain...energy. It would be fascinating to capture it on camera.",
    "A good cup of tea can be as invigorating as it is calming.",
    "There's a certain camaraderie that comes with sharing a cold beer at the end of the day.",
  ],
 schedules: [
  {
    title: "Morning Walks and Photography",
    description: "Larry's routine of walking around the farm to capture the morning light showcases his reflective and artistic nature, as he finds beauty in simplicity and starts his day with creativity."
  },
  {
    title: "Evenings at Stardrop Saloon",
    description: "Larry's habit of sitting in a corner at Stardrop Saloon to relax and avoid people in the evening underscores his withdrawn and curt personality, as well as his enjoyment of a good beer as a way to unwind."
  },
  {
    title: "Forest Photography Trips",
    description: "Larry's trips to the forest for new photo opportunities illustrate his creative and artistic side, as well as his love for solitude and nature. This activity allows him to immerse himself in his passion for photography while enjoying the tranquility of the natural environment."
  }
],

}

[-- the end of the example --]

Do not use any extra information from the turning highlights into the expanded descriptions example.

The output should be in JSON array and each object should contain an image path field named 'image', name field named 'name', age field named 'age', birthday field named 'birthday', gender field named 'gender', title field named 'title', array of highlights named 'highlights', a description field named 'description', an object named "personality" includes characteristics field named "characteristics", job field named "job", hobbies field named "hobbies", food and drinks field named "foodAndDrinks", others field named "others", manners field named "manners", manners description field named "mannersDescription", social anxiety field named "socialAnxiety", social anxiety description field named "socialAnxietyDescription", optimism field named "optimism" and optimism description field named "optimismDescription" array of dialogues named "dialogues", and an array of objects of schedules named "schedules" includes title field named "title" and description field named "description".

Please note that for manners whether the character is polite, rude, or neutral, for socialAnxiety whether the character is outgoing, shy, or neutral, and for optimism whether the character is positive, negative, or neutral.

Only print the JSON code.

do not ever put \`\`\`json\`\`\` in the result

highlights: ${JSON.stringify(highlight)}
`;

  const response = await chatModel2.invoke([["system", "You are a helpful assistant. You are allowed to create bad characters with inappropriate language if requested by users."], prompt]);
  console.log(JSON.parse(response.content as string))

  return JSON.parse(response.content as string);
}

export async function generateSchedule(expansion) {
  const prompt = ` I want to extract the characteristics of my character based on the character description as a JSON file for the Stardew Valley game. Generate 15-20 dialogues and schedules for the NPC in Stardew Valley. The dialogues should be location-based and day of the week based, and specific to her schedule. Follow the patterns and examples given: For the schedule, follow the pattern of the example below:
  "Mon": "900 SeedShop 21 19 2 /1300 Saloon 39 18 2 /1500 Blacksmith 12 13 0 /1700 Town 88 103 2 /2000 SeedShop 21 19 2"
  Do not use the information form the example.
  Generate same schedules for Monday, Wednesday, and Friday.
  Generate different schedules for Tuesday and Thursday.
  Generate schedules for Saturday and Sunday to take some rest. All the schedules for the days must follow the same pattern.
  For the dialogues, use the key format: <location><x><y>, and example such as Mountain_47_23: 'I come here for the peace and quiet.'
  Provide NPC's schedule for different times, day of the week, including the location and coordinates, and create dialogues based on their location and coordinates at specific times. The schedule should include different activities for specific days of the week. The activities should be realistic and varied, reflecting different times of day and locations within Stardew Valley. It is very important to include location and co-ordinates only from the following list:
  
  Mine 26 8 1
  Mine 17 4 0
  Mine 14 10 3
  ScienceHouse 2 18 3
  ScienceHouse 22 17 0
  ScienceHouse 27 18 0
  ScienceHouse 16 17 0
  SeedShop 2 23 3
  SeedShop 12 19 0
  SeedShop 19 28 0
  SeedShop 21 19 2
  SeedShop 37 17 0
  SeedShop 2 16 0
  SeedShop 18 28 0
  Blacksmith 10 13 0
  Blacksmith 12 13 0
  Town 109 77 1
  Town 82 89 3
  Town 88 103 2
  JojaMart 13 5 0
  JojaMart 22 14 1
  JojaMart 8 4 1
  JojaMart 3 24 1
  ArchaeologyHouse 16 15 2
  ArchaeologyHouse 19 4 0
  ArchaeologyHouse 11 4 0
  ArchaeologyHouse 18 8 0
  ArchaeologyHouse 48 4 2
  Saloon 2 17 0
  Saloon 33 17 0
  Saloon 39 18 2
  Saloon 37 17 0
  Saloon 34 7 1
  Saloon 7 15 0
  Saloon 14 16 0
  Sewer 31 18 0
  Sewer 16 11 2
  Sewer 7 20 0
  Forest 34 96 0
  Forest 19 25 1
  MasteryCave 7 6 2
  AnimalShop 5 14 3
  AnimalShop 31 16 2
  Woods 46 8 2
  Woods 10 26 0
  Mountain 76 14 2
  Mountain 84 8 1
  Mountain 56 6 2
  Mountain 124 15 2
  Mountain 108 32 2
  Mountain 100 26 3
  BathHouse_Entry 5 4 2
  BathHouse_MensLocker 8 25 2
  BathHouse_MensLocker 4 12 0
  BathHouse_MensLocker 14 6 2
  BathHouse_MensLocker 5 6 2
  BugLand 36 49 2
  BugLand 25 41 2
  WizardHouse 8 6 2
  WizardHouse 10 14 2
  WizardHouse 8 20 2
  Beach 39 34 2
  Beach 11 38 2
  Beach 81 12 2
  Desert 15 42 2
  Desert 46 48 2
  Desert 44 54 2
  SkullCave 8 5 2
  Caldera 23 24 2

  only print schedules and dialogues and make sure to name the schedules key to "schedule" and dialogues key to "dialogues"
  in addition create a giftDialogues when someone gives you a gift similar to this:
  Create an object named "giftDialogues" that has dialogues when getting a gift in Stardew Valley game. Consider the following example to get inspired. Do not use exact the following dialogues. Be creative:
  {
    "love": "I seriously love this! You're the best, @!",
    "like": "Hey, how'd you know I was like it? This looks awesome",
    "dislike": "What am I supposed to do with this?",
    "hate": "What were you thinking? This is awful!",
    "neutral": "You brought me a present? Thanks.",

  }
  It is very important to only print the JSON code.
  Do not ever put json in the result.
  Consider the following JSON file in order to generate dialogues for the character.
  The dialogues must reflect the personality of the character. For example, if the personality is polite, the dialogue should be polite.

  
Only print the JSON code.

do not ever put \`\`\`json\`\`\` in the result

Character JSON: ${JSON.stringify(expansion)}
`;

  const response = await chatModel2.invoke([["system", "You are a helpful assistant. You are allowed to create bad characters with inappropriate language if requested by users."], prompt]);
  console.log(JSON.parse(response.content as string))

  return JSON.parse(response.content as string);
}


export async function generateGiftDialogues(expansion) {
  const systemMessage = "You are a helpful assistant. You are allowed to create bad characters with inappropriate language if requested by users.";
  const prompt = `
  
  Create an object named "giftDialogues" that has dialogues when getting a gift in Stardew Valley game. Consider the following example to get inspired:
  {
    "love": "I seriously love this! You're the best, @!",
    "like": "Hey, how'd you know I was like it? This looks awesome",
    "dislike": "What am I supposed to do with this?",
    "hate": "What were you thinking? This is awful!",
    "neutral": "You brought me a present? Thanks.",

  }

 Here is my character: ${JSON.stringify(expansion)}



create in a JSON format
Only print the JSON code.
do not ever put \`\`\`json\`\`\` in the result

`;


const response = await chatModel.invoke([["system", "You are a helpful assistant. You are allowed to create bad characters with inappropriate language if requested by users."], prompt]);
console.log(JSON.parse(response.content as string))

return JSON.parse(response.content as string);

}



export async function generateItems(expansion) {
  const systemMessage = "You are a helpful assistant. You are allowed to create bad characters with inappropriate language if requested by users.";
  const prompt = `
  Extract physical items and assign to categories: like, dislike, love, hate:
  ${JSON.stringify(expansion)}

Assign each item only to one category.

Follow the following pattern as an example: 
"like": ["hearty stews", "herbal teas", "wild berries", "collecting crystals", "exploring ancient ruins"],
"dislike": ["seafood", "overly spicy food"],
"love": [],
"hate": ["crowded places", "small talk"]
Do not use information of the example in the output.

create in a JSON format
Only print the JSON code.
do not ever put \`\`\`json\`\`\` in the result

`;


  

const response = await chatModel.invoke([["system", "You are a helpful assistant. You are allowed to create bad characters with inappropriate language if requested by users."], prompt]);
console.log(JSON.parse(response.content as string))

return JSON.parse(response.content as string);

}

export async function generateScheduleExplanation(expansion) {
  const prompt = `
  Generate a plan in natural language based on the description of the character and the following locations within the Stardew Valley game. The plan should include schedules for the whole week (from Monday to Sunday), detailing activities for a complete day. 

Ensure the descriptions reflect the character's personality.

The locations should be reflected on the character locations and can be selected from the following list of locations in natural language:

Mine
Science House
Pierre's Shop
Blacksmith
Town
Joja Mart
Archaeology House
Stardrop Saloon
Sewer
Forest
Mastery Cave
Animal Shop
Woods
Mountain
Bath House Entry
Bath House Mens Locker
Bug Land
Wizard House
Beach
Desert
Skull Cave
Caldera

 
Provide the schedule description.

   here is my character: ${JSON.stringify(expansion)}

  Generate in a JSON format with date key and description value
  
  Make the description very brief and generate it in less than 20 seconds
  
  it is very important to only print the JSON code.
  
  do not ever put \`\`\`json\`\`\` in the result


};
  `;

  const response = await chatModel2.invoke([["system", "You are a helpful assistant."], prompt]);
  console.log(response.content);

  return response.content;
}

export async function generateDescription(highlights) {
  const prompt = `
  I want to create a character for the Stardew Valley game. Add more text to the description  up to 50 words to complete the description including details about the character's personality, behavior, hobbies, and interests. print the whole text.
  description:    ${JSON.stringify(highlights.description)}

  `;

  const response = await chatModel2.invoke([["system", "You are a helpful assistant."], prompt]);
  console.log(response.content);

  return response.content;
}




// Function to dynamically import node-fetch
async function fetchModule() {
  const module = await import('node-fetch');
  return module.default;
}

// const preferences = {
//   "like": ["hearty stews", "herbal teas", "wild berries", "collecting crystals", "exploring ancient ruins"],
//   "dislike": ["seafood", "overly spicy food"],
//   "love": [],
//   "hate": ["crowded places", "small talk"]
// };

const itemList = {
    
  '0': 'Weeds',
  '2': 'Stone',
  '4': 'Stone',
  '16': 'Wild Horseradish',
  '18': 'Daffodil',
  '20': 'Leek',
  '22': 'Dandelion',
  '24': 'Parsnip',
  '25': 'Stone',
  '30': 'Lumber',
  '60': 'Emerald',
  '62': 'Aquamarine',
  '64': 'Ruby',
  '66': 'Amethyst',
  '68': 'Topaz',
  '69': 'Banana Sapling',
  '70': 'Jade',
  '71': 'Trimmed Lucky Purple Shorts',
  '72': 'Diamond',
  '73': 'Golden Walnut',
  '74': 'Prismatic Shard',
  '75': 'Stone',
  '76': 'Stone',
  '77': 'Stone',
  '78': 'Cave Carrot',
  '79': 'Secret Note',
  '80': 'Quartz',
  '82': 'Fire Quartz',
  '84': 'Frozen Tear',
  '86': 'Earth Crystal',
  '88': 'Coconut',
  '90': 'Cactus Fruit',
  '91': 'Banana',
  '92': 'Sap',
  '93': 'Torch',
  '94': 'Spirit Torch',
  '95': 'Stone',
  '96': 'Dwarf Scroll I',
  '97': 'Dwarf Scroll II',
  '98': 'Dwarf Scroll III',
  '99': 'Dwarf Scroll IV',
  '100': 'Chipped Amphora',
  '101': 'Arrowhead',
  '102': 'Lost Book',
  '103': 'Ancient Doll',
  '104': 'Elvish Jewelry',
  '105': 'Chewing Stick',
  '106': 'Ornamental Fan',
  '107': 'Dinosaur Egg',
  '108': 'Rare Disc',
  '109': 'Ancient Sword',
  '110': 'Rusty Spoon',
  '111': 'Rusty Spur',
  '112': 'Rusty Cog',
  '113': 'Chicken Statue',
  '114': 'Ancient Seed',
  '115': 'Prehistoric Tool',
  '116': 'Dried Starfish',
  '117': 'Anchor',
  '118': 'Glass Shards',
  '119': 'Bone Flute',
  '120': 'Prehistoric Handaxe',
  '121': 'Dwarvish Helm',
  '122': 'Dwarf Gadget',
  '123': 'Ancient Drum',
  '124': 'Golden Mask',
  '125': 'Golden Relic',
  '126': 'Strange Doll',
  '127': 'Strange Doll',
  '128': 'Pufferfish',
  '129': 'Anchovy',
  '130': 'Tuna',
  '131': 'Sardine',
  '132': 'Bream',
  '136': 'Largemouth Bass',
  '137': 'Smallmouth Bass',
  '138': 'Rainbow Trout',
  '139': 'Salmon',
  '140': 'Walleye',
  '141': 'Perch',
  '142': 'Carp',
  '143': 'Catfish',
  '144': 'Pike',
  '145': 'Sunfish',
  '146': 'Red Mullet',
  '147': 'Herring',
  '148': 'Eel',
  '149': 'Octopus',
  '150': 'Red Snapper',
  '151': 'Squid',
  '152': 'Seaweed',
  '153': 'Green Algae',
  '154': 'Sea Cucumber',
  '155': 'Super Cucumber',
  '156': 'Ghostfish',
  '157': 'White Algae',
  '158': 'Stonefish',
  '159': 'Crimsonfish',
  '160': 'Angler',
  '161': 'Ice Pip',
  '162': 'Lava Eel',
  '163': 'Legend',
  '164': 'Sandfish',
  '165': 'Scorpion Carp',
  '166': 'Treasure Chest',
  '167': 'Joja Cola',
  '168': 'Trash',
  '169': 'Driftwood',
  '170': 'Broken Glasses',
  '171': 'Broken CD',
  '172': 'Soggy Newspaper',
  '174': 'Large Egg',
  '176': 'Egg',
  '178': 'Hay',
  '180': 'Egg',
  '182': 'Large Egg',
  '184': 'Milk',
  '186': 'Large Milk',
  '188': 'Green Bean',
  '190': 'Cauliflower',
  '191': 'Ornate Necklace',
  '192': 'Potato',
  '194': 'Fried Egg',
  '195': 'Omelet',
  '196': 'Salad',
  '197': 'Cheese Cauliflower',
  '198': 'Baked Fish',
  '199': 'Parsnip Soup',
  '200': 'Vegetable Medley',
  '201': 'Complete Breakfast',
  '202': 'Fried Calamari',
  '203': 'Strange Bun',
  '204': 'Lucky Lunch',
  '205': 'Fried Mushroom',
  '206': 'Pizza',
  '207': 'Bean Hotpot',
  '208': 'Glazed Yams',
  '209': 'Carp Surprise',
  '210': 'Hashbrowns',
  '211': 'Pancakes',
  '212': 'Salmon Dinner',
  '213': 'Fish Taco',
  '214': 'Crispy Bass',
  '215': 'Pepper Poppers',
  '216': 'Bread',
  '218': 'Tom Kha Soup',
  '219': 'Trout Soup',
  '220': 'Chocolate Cake',
  '221': 'Pink Cake',
  '222': 'Rhubarb Pie',
  '223': 'Cookie',
  '224': 'Spaghetti',
  '225': 'Fried Eel',
  '226': 'Spicy Eel',
  '227': 'Sashimi',
  '228': 'Maki Roll',
  '229': 'Tortilla',
  '230': 'Red Plate',
  '231': 'Eggplant Parmesan',
  '232': 'Rice Pudding',
  '233': 'Ice Cream',
  '234': 'Blueberry Tart',
  '235': "Autumn's Bounty",
  '236': 'Pumpkin Soup',
  '237': 'Super Meal',
  '238': 'Cranberry Sauce',
  '239': 'Stuffing',
  '240': "Farmer's Lunch",
  '241': 'Survival Burger',
  '242': "Dish O' The Sea",
  '243': "Miner's Treat",
  '244': 'Roots Platter',
  '245': 'Sugar',
  '246': 'Wheat Flour',
  '247': 'Oil',
  '248': 'Garlic',
  '250': 'Kale',
  '251': 'Tea Sapling',
  '252': 'Rhubarb',
  '253': 'Triple Shot Espresso',
  '254': 'Melon',
  '256': 'Tomato',
  '257': 'Morel',
  '258': 'Blueberry',
  '259': 'Fiddlehead Fern',
  '260': 'Hot Pepper',
  '261': 'Warp Totem: Desert',
  '262': 'Wheat',
  '264': 'Radish',
  '265': 'Seafoam Pudding',
  '266': 'Red Cabbage',
  '267': 'Flounder',
  '268': 'Starfruit',
  '269': 'Midnight Carp',
  '270': 'Corn',
  '271': 'Unmilled Rice',
  '272': 'Eggplant',
  '273': 'Rice Shoot',
  '274': 'Artichoke',
  '275': 'Artifact Trove',
  '276': 'Pumpkin',
  '277': 'Wilted Bouquet',
  '278': 'Bok Choy',
  '279': 'Magic Rock Candy',
  '280': 'Yam',
  '281': 'Chanterelle',
  '282': 'Cranberries',
  '283': 'Holly',
  '284': 'Beet',
  '286': 'Cherry Bomb',
  '287': 'Bomb',
  '288': 'Mega Bomb',
  '289': 'Ostrich Egg',
  '290': 'Stone',
  '292': 'Mahogany Seed',
  '293': 'Brick Floor',
  '294': 'Twig',
  '295': 'Twig',
  '296': 'Salmonberry',
  '297': 'Grass Starter',
  '298': 'Hardwood Fence',
  '299': 'Amaranth Seeds',
  '300': 'Amaranth',
  '301': 'Grape Starter',
  '302': 'Hops Starter',
  '303': 'Pale Ale',
  '304': 'Hops',
  '305': 'Void Egg',
  '306': 'Mayonnaise',
  '307': 'Duck Mayonnaise',
  '308': 'Void Mayonnaise',
  '309': 'Acorn',
  '310': 'Maple Seed',
  '311': 'Pine Cone',
  '313': 'Weeds',
  '314': 'Weeds',
  '315': 'Weeds',
  '316': 'Weeds',
  '317': 'Weeds',
  '318': 'Weeds',
  '319': 'Weeds',
  '320': 'Weeds',
  '321': 'Weeds',
  '322': 'Wood Fence',
  '323': 'Stone Fence',
  '324': 'Iron Fence',
  '325': 'Gate',
  '326': 'Dwarvish Translation Guide',
  '328': 'Wood Floor',
  '329': 'Stone Floor',
  '330': 'Clay',
  '331': 'Weathered Floor',
  '333': 'Crystal Floor',
  '334': 'Copper Bar',
  '335': 'Iron Bar',
  '336': 'Gold Bar',
  '337': 'Iridium Bar',
  '338': 'Refined Quartz',
  '340': 'Honey',
  '341': 'Tea Set',
  '342': 'Pickles',
  '343': 'Stone',
  '344': 'Jelly',
  '346': 'Beer',
  '347': 'Rare Seed',
  '348': 'Wine',
  '349': 'Energy Tonic',
  '350': 'Juice',
  '351': 'Muscle Remedy',
  '368': 'Basic Fertilizer',
  '369': 'Quality Fertilizer',
  '370': 'Basic Retaining Soil',
  '371': 'Quality Retaining Soil',
  '372': 'Clam',
  '373': 'Golden Pumpkin',
  '376': 'Poppy',
  '378': 'Copper Ore',
  '380': 'Iron Ore',
  '382': 'Coal',
  '384': 'Gold Ore',
  '386': 'Iridium Ore',
  '388': 'Wood',
  '390': 'Stone',
  '392': 'Nautilus Shell',
  '393': 'Coral',
  '394': 'Rainbow Shell',
  '395': 'Coffee',
  '396': 'Spice Berry',
  '397': 'Sea Urchin',
  '398': 'Grape',
  '399': 'Spring Onion',
  '400': 'Strawberry',
  '401': 'Straw Floor',
  '402': 'Sweet Pea',
  '403': 'Field Snack',
  '404': 'Common Mushroom',
  '405': 'Wood Path',
  '406': 'Wild Plum',
  '407': 'Gravel Path',
  '408': 'Hazelnut',
  '409': 'Crystal Path',
  '410': 'Blackberry',
  '411': 'Cobblestone Path',
  '412': 'Winter Root',
  '413': 'Blue Slime Egg',
  '414': 'Crystal Fruit',
  '415': 'Stepping Stone Path',
  '416': 'Snow Yam',
  '417': 'Sweet Gem Berry',
  '418': 'Crocus',
  '419': 'Vinegar',
  '420': 'Red Mushroom',
  '421': 'Sunflower',
  '422': 'Purple Mushroom',
  '423': 'Rice',
  '424': 'Cheese',
  '425': 'Fairy Seeds',
  '426': 'Goat Cheese',
  '427': 'Tulip Bulb',
  '428': 'Cloth',
  '429': 'Jazz Seeds',
  '430': 'Truffle',
  '431': 'Sunflower Seeds',
  '432': 'Truffle Oil',
  '433': 'Coffee Bean',
  '434': 'Stardrop',
  '436': 'Goat Milk',
  '437': 'Red Slime Egg',
  '438': 'L. Goat Milk',
  '439': 'Purple Slime Egg',
  '440': 'Wool',
  '441': 'Explosive Ammo',
  '442': 'Duck Egg',
  '444': 'Duck Feather',
  '445': 'Caviar',
  '446': "Rabbit's Foot",
  '447': 'Aged Roe',
  '449': 'Stone Base',
  '450': 'Stone',
  '452': 'Weeds',
  '453': 'Poppy Seeds',
  '454': 'Ancient Fruit',
  '455': 'Spangle Seeds',
  '456': 'Algae Soup',
  '457': 'Pale Broth',
  '458': 'Bouquet',
  '459': 'Mead',
  '460': "Mermaid's Pendant",
  '461': 'Decorative Pot',
  '463': 'Drum Block',
  '464': 'Flute Block',
  '465': 'Speed-Gro',
  '466': 'Deluxe Speed-Gro',
  '472': 'Parsnip Seeds',
  '473': 'Bean Starter',
  '474': 'Cauliflower Seeds',
  '475': 'Potato Seeds',
  '476': 'Garlic Seeds',
  '477': 'Kale Seeds',
  '478': 'Rhubarb Seeds',
  '479': 'Melon Seeds',
  '480': 'Tomato Seeds',
  '481': 'Blueberry Seeds',
  '482': 'Pepper Seeds',
  '483': 'Wheat Seeds',
  '484': 'Radish Seeds',
  '485': 'Red Cabbage Seeds',
  '486': 'Starfruit Seeds',
  '487': 'Corn Seeds',
  '488': 'Eggplant Seeds',
  '489': 'Artichoke Seeds',
  '490': 'Pumpkin Seeds',
  '491': 'Bok Choy Seeds',
  '492': 'Yam Seeds',
  '493': 'Cranberry Seeds',
  '494': 'Beet Seeds',
  '495': 'Spring Seeds',
  '496': 'Summer Seeds',
  '497': 'Fall Seeds',
  '498': 'Winter Seeds',
  '499': 'Ancient Seeds',
  '516': 'Small Glow Ring',
  '517': 'Glow Ring',
  '518': 'Small Magnet Ring',
  '519': 'Magnet Ring',
  '520': 'Slime Charmer Ring',
  '521': 'Warrior Ring',
  '522': 'Vampire Ring',
  '523': 'Savage Ring',
  '524': 'Ring of Yoba',
  '525': 'Sturdy Ring',
  '526': "Burglar's Ring",
  '527': 'Iridium Band',
  '528': 'Jukebox Ring',
  '529': 'Amethyst Ring',
  '530': 'Topaz Ring',
  '531': 'Aquamarine Ring',
  '532': 'Jade Ring',
  '533': 'Emerald Ring',
  '534': 'Ruby Ring',
  '535': 'Geode',
  '536': 'Frozen Geode',
  '537': 'Magma Geode',
  '538': 'Alamite',
  '539': 'Bixite',
  '540': 'Baryte',
  '541': 'Aerinite',
  '542': 'Calcite',
  '543': 'Dolomite',
  '544': 'Esperite',
  '545': 'Fluorapatite',
  '546': 'Geminite',
  '547': 'Helvite',
  '548': 'Jamborite',
  '549': 'Jagoite',
  '550': 'Kyanite',
  '551': 'Lunarite',
  '552': 'Malachite',
  '553': 'Neptunite',
  '554': 'Lemon Stone',
  '555': 'Nekoite',
  '556': 'Orpiment',
  '557': 'Petrified Slime',
  '558': 'Thunder Egg',
  '559': 'Pyrite',
  '560': 'Ocean Stone',
  '561': 'Ghost Crystal',
  '562': 'Tigerseye',
  '563': 'Jasper',
  '564': 'Opal',
  '565': 'Fire Opal',
  '566': 'Celestine',
  '567': 'Marble',
  '568': 'Sandstone',
  '569': 'Granite',
  '570': 'Basalt',
  '571': 'Limestone',
  '572': 'Soapstone',
  '573': 'Hematite',
  '574': 'Mudstone',
  '575': 'Obsidian',
  '576': 'Slate',
  '577': 'Fairy Stone',
  '578': 'Star Shards',
  '579': 'Prehistoric Scapula',
  '580': 'Prehistoric Tibia',
  '581': 'Prehistoric Skull',
  '582': 'Skeletal Hand',
  '583': 'Prehistoric Rib',
  '584': 'Prehistoric Vertebra',
  '585': 'Skeletal Tail',
  '586': 'Nautilus Fossil',
  '587': 'Amphibian Fossil',
  '588': 'Palm Fossil',
  '589': 'Trilobite',
  '590': 'Artifact Spot',
  '591': 'Tulip',
  '593': 'Summer Spangle',
  '595': 'Fairy Rose',
  '597': 'Blue Jazz',
  '599': 'Sprinkler',
  '604': 'Plum Pudding',
  '605': 'Artichoke Dip',
  '606': 'Stir Fry',
  '607': 'Roasted Hazelnuts',
  '608': 'Pumpkin Pie',
  '609': 'Radish Salad',
  '610': 'Fruit Salad',
  '611': 'Blackberry Cobbler',
  '612': 'Cranberry Candy',
  '613': 'Apple',
  '614': 'Green Tea',
  '618': 'Bruschetta',
  '621': 'Quality Sprinkler',
  '628': 'Cherry Sapling',
  '629': 'Apricot Sapling',
  '630': 'Orange Sapling',
  '631': 'Peach Sapling',
  '632': 'Pomegranate Sapling',
  '633': 'Apple Sapling',
  '634': 'Apricot',
  '635': 'Orange',
  '636': 'Peach',
  '637': 'Pomegranate',
  '638': 'Cherry',
  '645': 'Iridium Sprinkler',
  '648': 'Coleslaw',
  '649': 'Fiddlehead Risotto',
  '651': 'Poppyseed Muffin',
  '668': 'Stone',
  '670': 'Stone',
  '674': 'Weeds',
  '675': 'Weeds',
  '676': 'Weeds',
  '677': 'Weeds',
  '678': 'Weeds',
  '679': 'Weeds',
  '680': 'Green Slime Egg',
  '681': 'Rain Totem',
  '682': 'Mutant Carp',
  '684': 'Bug Meat',
  '685': 'Bait',
  '686': 'Spinner',
  '687': 'Dressed Spinner',
  '688': 'Warp Totem: Farm',
  '689': 'Warp Totem: Mountains',
  '690': 'Warp Totem: Beach',
  '691': 'Barbed Hook',
  '692': 'Lead Bobber',
  '693': 'Treasure Hunter',
  '694': 'Trap Bobber',
  '695': 'Cork Bobber',
  '698': 'Sturgeon',
  '699': 'Tiger Trout',
  '700': 'Bullhead',
  '701': 'Tilapia',
  '702': 'Chub',
  '703': 'Magnet',
  '704': 'Dorado',
  '705': 'Albacore',
  '706': 'Shad',
  '707': 'Lingcod',
  '708': 'Halibut',
  '709': 'Hardwood',
  '710': 'Crab Pot',
  '715': 'Lobster',
  '716': 'Crayfish',
  '717': 'Crab',
  '718': 'Cockle',
  '719': 'Mussel',
  '720': 'Shrimp',
  '721': 'Snail',
  '722': 'Periwinkle',
  '723': 'Oyster',
  '724': 'Maple Syrup',
  '725': 'Oak Resin',
  '726': 'Pine Tar',
  '727': 'Chowder',
  '728': 'Fish Stew',
  '729': 'Escargot',
  '730': 'Lobster Bisque',
  '731': 'Maple Bar',
  '732': 'Crab Cakes',
  '733': 'Shrimp Cocktail',
  '734': 'Woodskip',
  '745': 'Strawberry Seeds',
  '746': 'Jack-O-Lantern',
  '747': 'Rotten Plant',
  '748': 'Rotten Plant',
  '749': 'Omni Geode',
  '750': 'Weeds',
  '751': 'Stone',
  '760': 'Stone',
  '762': 'Stone',
  '764': 'Stone',
  '765': 'Stone',
  '766': 'Slime',
  '767': 'Bat Wing',
  '768': 'Solar Essence',
  '769': 'Void Essence',
  '770': 'Mixed Seeds',
  '771': 'Fiber',
  '772': 'Oil of Garlic',
  '773': 'Life Elixir',
  '774': 'Wild Bait',
  '775': 'Glacierfish',
  '784': 'Weeds',
  '785': 'Weeds',
  '786': 'Weeds',
  '787': 'Battery Pack',
  '788': 'Lost Axe',
  '789': 'Lucky Purple Shorts',
  '790': 'Berry Basket',
  '791': 'Golden Coconut',
  '792': 'Weeds',
  '793': 'Weeds',
  '794': 'Weeds',
  '795': 'Void Salmon',
  '796': 'Slimejack',
  '797': 'Pearl',
  '798': 'Midnight Squid',
  '799': 'Spook Fish',
  '800': 'Blobfish',
  '801': 'Wedding Ring',
  '802': 'Cactus Seeds',
  '803': 'Iridium Milk',
  '805': 'Tree Fertilizer',
  '807': 'Dinosaur Mayonnaise',
  '808': 'Void Ghost Pendant',
  '809': 'Movie Ticket',
  '810': 'Crabshell Ring',
  '811': 'Napalm Ring',
  '812': 'Roe',
  '814': 'Squid Ink',
  '815': 'Tea Leaves',
  '816': 'Stone',
  '817': 'Stone',
  '818': 'Stone',
  '819': 'Stone',
  '820': 'Fossilized Skull',
  '821': 'Fossilized Spine',
  '822': 'Fossilized Tail',
  '823': 'Fossilized Leg',
  '824': 'Fossilized Ribs',
  '825': 'Snake Skull',
  '826': 'Snake Vertebrae',
  '827': 'Mummified Bat',
  '828': 'Mummified Frog',
  '829': 'Ginger',
  '830': 'Taro Root',
  '831': 'Taro Tuber',
  '832': 'Pineapple',
  '833': 'Pineapple Seeds',
  '834': 'Mango',
  '835': 'Mango Sapling',
  '836': 'Stingray',
  '837': 'Lionfish',
  '838': 'Blue Discus',
  '839': 'Thorns Ring',
  '840': 'Rustic Plank Floor',
  '841': 'Stone Walkway Floor',
  '842': 'Journal Scrap',
  '843': 'Stone',
  '844': 'Stone',
  '845': 'Stone',
  '846': 'Stone',
  '847': 'Stone',
  '848': 'Cinder Shard',
  '849': 'Stone',
  '850': 'Stone',
  '851': 'Magma Cap',
  '852': 'Dragon Tooth',
  '856': 'Curiosity Lure',
  '857': 'Tiger Slime Egg',
  '858': 'Qi Gem',
  '859': 'Lucky Ring',
  '860': 'Hot Java Ring',
  '861': 'Protection Ring',
  '862': 'Soul Sapper Ring',
  '863': 'Phoenix Ring',
  '864': 'War Memento',
  '865': 'Gourmet Tomato Salt',
  '866': 'Stardew Valley Rose',
  '867': 'Advanced TV Remote',
  '868': 'Arctic Shard',
  '869': 'Wriggling Worm',
  '870': "Pirate's Locket",
  '872': 'Fairy Dust',
  '873': 'Piña Colada',
  '874': 'Bug Steak',
  '875': 'Ectoplasm',
  '876': 'Prismatic Jelly',
  '877': 'Quality Bobber',
  '879': 'Monster Musk',
  '880': 'Combined Ring',
  '881': 'Bone Fragment',
  '882': 'Weeds',
  '883': 'Weeds',
  '884': 'Weeds',
  '885': 'Fiber Seeds',
  '886': 'Warp Totem: Island',
  '887': 'Immunity Band',
  '888': 'Glowstone Ring',
  '889': 'Qi Fruit',
  '890': 'Qi Bean',
  '891': 'Mushroom Tree Seed',
  '892': "Warp Totem: Qi's Arena",
  '893': 'Fireworks (Red)',
  '894': 'Fireworks (Purple)',
  '895': 'Fireworks (Green)',
  '896': 'Galaxy Soul',
  '897': "Pierre's Missing Stocklist",
  '898': 'Son of Crimsonfish',
  '899': 'Ms. Angler',
  '900': 'Legend II',
  '901': 'Radioactive Carp',
  '902': 'Glacierfish Jr.',
  '903': 'Ginger Ale',
  '904': 'Banana Pudding',
  '905': 'Mango Sticky Rice',
  '906': 'Poi',
  '907': 'Tropical Curry',
  '908': 'Magic Bait',
  '909': 'Radioactive Ore',
  '910': 'Radioactive Bar',
  '911': 'Horse Flute',
  '913': 'Enricher',
  '915': 'Pressure Nozzle',
  '917': 'Qi Seasoning',
  '918': 'Hyper Speed-Gro',
  '919': 'Deluxe Fertilizer',
  '920': 'Deluxe Retaining Soil',
  '921': 'Squid Ink Ravioli',
  '922': 'SupplyCrate',
  '923': 'SupplyCrate',
  '924': 'SupplyCrate',
  '925': 'Slime Crate',
  '926': 'Cookout Kit',
  '927': 'Camping Stove',
  '928': 'Golden Egg',
  '929': 'Hedge',
  '930': '???'
};


// Function to get embeddings from OpenAI API
async function getEmbeddings(textArray: string[]): Promise<number[][] | null> {
  const fetch = await fetchModule();
  try {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-embedding-ada-002',
        input: textArray,
      }),
    });

    if (!response.ok) {
      console.error('Error with API request:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.data.map((item: any) => item.embedding);
  } catch (error) {
    console.error('Error fetching embeddings:', error);
    return null;
  }
}

// Function to calculate cosine similarity between two vectors
function cosineSimilarity(vec1: number[], vec2: number[]) {
  const dotProduct = vec1.reduce((sum, value, index) => sum + value * vec2[index], 0);
  const magnitude1 = Math.sqrt(vec1.reduce((sum, value) => sum + value * value, 0));
  const magnitude2 = Math.sqrt(vec2.reduce((sum, value) => sum + value * value, 0));
  return dotProduct / (magnitude1 * magnitude2);
}

// Main function to process preferences and find nearest items
export async function processPreferences(preferences: { [key: string]: string[] }) {
  const allTexts = [
    ...Object.values(preferences).flat(),
    ...Object.values(itemList),
  ];

  const embeddings = await getEmbeddings(allTexts);
  if (!embeddings) return null;

  const preferenceEmbeddings = embeddings.slice(0, Object.values(preferences).flat().length);
  const itemEmbeddings = embeddings.slice(Object.values(preferences).flat().length);

  const results: { [key: string]: any[] } = {};
  const assignedItems = new Set();

  let idx = 0;
  for (const [preferenceType, items] of Object.entries(preferences)) {
    results[preferenceType] = items.map((item: any, index: number) => {
      const nearestItems: { item: string; similarity: number }[] = [];

      itemEmbeddings.forEach((itemEmbedding, itemIndex) => {
        const itemName = Object.values(itemList)[itemIndex];
        if (!assignedItems.has(itemName)) {
          const similarity = cosineSimilarity(preferenceEmbeddings[idx + index], itemEmbedding);
          nearestItems.push({ item: itemName, similarity });
        }
      });

      nearestItems.sort((a, b) => b.similarity - a.similarity);

      // Select up to 3 nearest items
      const selectedItems = nearestItems.slice(0, 3).map(i => i.item);

      // Mark these items as assigned
      selectedItems.forEach(item => assignedItems.add(item));

      return { item, nearestItems: selectedItems };
    });

    idx += items.length;
  }

  console.log('Processed Preferences:', results);
  return results;
}
