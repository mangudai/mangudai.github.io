monaco.editor.create(document.querySelector('.editor') as HTMLElement, {
  roundedSelection: false,
  scrollBeyondLastLine: false,
  theme: 'vs-dark',
  value: [
    '<PLAYER_SETUP>',
    'random_placement',
    '',
    '<LAND_GENERATION>',
    'base_terrain GRASS',
    '',
    '<OBJECTS_GENERATION>',
    'create_object TOWN_CENTER {',
    '  set_place_for_every_player',
    '  max_distance_to_players 0',
    '}',
    ''
  ].join('\n')
})
