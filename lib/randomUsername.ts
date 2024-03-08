export function randomUsername() {
  const adjectives = [
    "happy",
    "silly",
    "bright",
    "crazy",
    "funny",
    "awesome",
    "cool",
    "fierce",
    "giddy",
    "zesty",
    "brave",
    "playful",
    "quirky",
    "vibrant",
    "jolly",
  ]
  const nouns = [
    "alligator",
    "anteater",
    "armadillo",
    "auroch",
    "axolotl",
    "badger",
    "bat",
    "beaver",
    "buffalo",
    "camel",
    "capybara",
    "chameleon",
    "cheetah",
    "chinchilla",
    "chipmunk",
    "chupacabra",
    "cormorant",
    "coyote",
    "crow",
    "dingo",
    "dinosaur",
    "dolphin",
    "duck",
    "elephant",
    "ferret",
    "fox",
    "frog",
    "giraffe",
    "gopher",
    "grizzly",
    "hedgehog",
    "hippo",
    "hyena",
    "ibex",
    "ifrit",
    "iguana",
    "jackal",
    "kangaroo",
    "koala",
    "kraken",
    "lemur",
    "leopard",
    "liger",
    "llama",
    "manatee",
    "mink",
    "monkey",
    "moose",
    "narwhal",
    "orangutan",
    "otter",
    "panda",
    "penguin",
    "platypus",
    "pumpkin",
    "python",
    "quagga",
    "rabbit",
    "raccoon",
    "rhino",
    "sheep",
    "shrew",
    "skunk",
    "squirrel",
    "tiger",
    "turtle",
    "walrus",
    "wolf",
    "wolverine",
    "wombat",
  ]

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]

  return randomAdjective + "-" + randomNoun
}
