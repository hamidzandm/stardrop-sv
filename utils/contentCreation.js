export function transformAgeToLifeStage(age) {
  if (age < 13) {
    return "Child";
  } else if (age < 20) {
    return "Teen";
  } else {
    return "Adult";
  }
}

export function transformCharacterData(character, dialogues, schedules, giftDialogues, nearestItemKeys) {
  if (!character || !character.birthday) {
    throw new Error("Invalid character data: 'birthday' is required.");
  }

  const [birthSeason, birthDay] = character.birthday.split(' ');

  const lifeStage = transformAgeToLifeStage(character.age);

  const dialogueEntries = dialogues.reduce((acc, { event, text }) => {
    acc[event] = text;
    return acc;
  }, {});

  // Function to extract nearest keys for each category and join them as strings
  const extractCategoryKeys = (nearestItemKeys, category) => {
    if (!nearestItemKeys[category]) return "";
    let keys = [];
    nearestItemKeys[category].forEach(item => {
      keys = keys.concat(item.nearestKeys);
    });
    return keys.join(' ');
  };

  const likeKeys = extractCategoryKeys(nearestItemKeys, 'like');
  const loveKeys = extractCategoryKeys(nearestItemKeys, 'love');
  const dislikeKeys = extractCategoryKeys(nearestItemKeys, 'dislike');
  const hateKeys = extractCategoryKeys(nearestItemKeys, 'hate');

  return {
    "Changes": [
      {
        "Action": "EditData",
        "Target": "Data/Characters",
        "Entries": {
          [character.name]: {
            "DisplayName": character.name,
            "BirthSeason": birthSeason,
            "BirthDay": birthDay,
            "HomeRegion": "Other",
            "Language": "Default",
            "Gender": character.gender,
            "Age": lifeStage,
            "Manner": character.personality.manners,
            "SocialAnxiety": character.personality.socialAnxiety,
            "Optimism": character.personality.optimism,
            "IsDarkSkinned": false,
            "CanBeRomanced": false,
            "LoveInterest": "",
            "Calendar": "HiddenAlways",
            "SocialTab": "HiddenAlways",
            "CanSocialize": null,
            "CanVisitIsland": null,
            "IntroductionsQuest": null,
            "ItemDeliveryQuests": null,
            "PerfectionScore": true,
            "ExcludeFromIntroductionsQuest": true,
            "ExcludeFromPerfectionScore": true,
            "EndSlideShow": "TrailingGroup",
            "FriendsAndFamily": {},
            "UnlockConditions": null,
            "SpawnIfMissing": true,
            "Home": [
              {
                "Id": "Default",
                "Condition": null,
                "Location": "AnimalShop",
                "Tile": {
                  "X": 7,
                  "Y": 16
                },
                "Direction": "Down"
              }
            ],
            "TextureName": null,
            "Size": {
              "X": 16,
              "Y": 32
            },
            "CustomFields": null
          }
        }
      },
      {
        "Action": "Load",
        "Target": `Characters/Dialogue/${character.name}`,
        "Entries": dialogueEntries
      },
      {
        "Action": "Load",
        "Target": `Characters/Schedules/${character.name}`,
        "Entries": schedules
      },
      {
        "Action": "EditData",
        "Target": "Data/NPCGiftTastes",
        "Entries": `${giftDialogues.love}/${loveKeys}/${giftDialogues.like}/${likeKeys}/${giftDialogues.dislike}/${dislikeKeys}/${giftDialogues.hate}/${hateKeys}/${giftDialogues.neutral}/`
      }
    ]
  };
}
