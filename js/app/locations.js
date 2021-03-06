/*jslint nomen: true */
/*globals define: true */

define(function (require) {
  'use strict';

  return {

    locations: {
      "pspl-age-gender": [{
        geometry: {"type":"MultiPolygon","coordinates":[[[[-121.886816002679,37.3373790059473],[-121.887010645469,37.3372751434583],[-121.887242072071,37.3375955469113],[-121.887242843269,37.3376370846849],[-121.885385960472,37.3385176851206],[-121.885276990193,37.3385651363895],[-121.88523040539,37.3385472217211],[-121.885123536254,37.3383961462204],[-121.885416021199,37.3382680484448],[-121.88549934161,37.3383963204688],[-121.885728670656,37.3382920501086],[-121.885681829137,37.338260289692],[-121.885796750204,37.3382220003166],[-121.88573723537,37.3381303775987],[-121.885775728583,37.3380237470662],[-121.885711460799,37.3379875763914],[-121.885623644052,37.3379286024948],[-121.885592945381,37.3378320226926],[-121.885464923856,37.3377873729631],[-121.885367344068,37.3378254570349],[-121.885249086321,37.3376837489159],[-121.885197406326,37.3377028250314],[-121.885173515274,37.3376615605157],[-121.885081715752,37.3376995760325],[-121.88501029952,37.3375896283292],[-121.88568196581,37.3373324075011],[-121.885841627072,37.3375244051431],[-121.885904610431,37.3374913461099],[-121.886105976807,37.3374381851714],[-121.886313979433,37.3374311086025],[-121.886615750414,37.3374921671184],[-121.886744714358,37.3375875839854],[-121.88694012882,37.3375252593915],[-121.886816002679,37.3373790059473]]]]},
        name: 'City Hall',
        id: 'gehl-city-hall'
      }, {
        name: 'S Fernando and 4th St',
        id: 'gehl-s-fernando-4th',
        geometry: {"type":"Point","coordinates":[-121.885709221116,37.3357625359207]}
      }],

      "pspl-stationary": [{
        id: 'gehl-paseo-de-san-antonio',
        name: 'Paseo De San Antonio',
        geometry: {"type":"MultiPolygon","coordinates":[[[[-121.884680908919,37.3338543005284],[-121.884603631485,37.3337398055407],[-121.884735372802,37.3336736204644],[-121.884770651161,37.333705517861],[-121.884994357985,37.3336105478349],[-121.885041709587,37.3336700003962],[-121.885122115414,37.3336413521549],[-121.885145577379,37.3336595401359],[-121.885300523371,37.3335976964689],[-121.88534183857,37.3336433713011],[-121.885582627526,37.333534349243],[-121.885817464667,37.3334161644186],[-121.886069555183,37.3332931587302],[-121.886394257645,37.3333447137597],[-121.886412539341,37.3333952770321],[-121.88646455859,37.3333946616156],[-121.886791187163,37.3332384582321],[-121.886831475175,37.3332287488274],[-121.88720494833,37.3337275078101],[-121.886855113008,37.3338793706371],[-121.886707102459,37.3336918528693],[-121.886647847058,37.3336140765237],[-121.886652342276,37.3335447784924],[-121.886622329242,37.3334851214168],[-121.886581527206,37.3334671388926],[-121.886380257499,37.3335249159669],[-121.886269925148,37.3334985232153],[-121.886218162688,37.3335129844747],[-121.886242138613,37.3335588640947],[-121.885748745097,37.3337632011872],[-121.885653783966,37.3336304506867],[-121.885338368931,37.3337680530061],[-121.884738024217,37.3338166950987],[-121.884680908919,37.3338543005284]]]]}
      }, {
        id: 'gehl-city-hall',
        name: 'City Hall ',
        geometry: {"type":"MultiPolygon","coordinates":[[[[-121.886816002679,37.3373790059473],[-121.887010645469,37.3372751434583],[-121.887242072071,37.3375955469113],[-121.887242843269,37.3376370846849],[-121.885385960472,37.3385176851206],[-121.885276990193,37.3385651363895],[-121.88523040539,37.3385472217211],[-121.885123536254,37.3383961462204],[-121.885416021199,37.3382680484448],[-121.88549934161,37.3383963204688],[-121.885728670656,37.3382920501086],[-121.885681829137,37.338260289692],[-121.885796750204,37.3382220003166],[-121.88573723537,37.3381303775987],[-121.885775728583,37.3380237470662],[-121.885711460799,37.3379875763914],[-121.885623644052,37.3379286024948],[-121.885592945381,37.3378320226926],[-121.885464923856,37.3377873729631],[-121.885367344068,37.3378254570349],[-121.885249086321,37.3376837489159],[-121.885197406326,37.3377028250314],[-121.885173515274,37.3376615605157],[-121.885081715752,37.3376995760325],[-121.88501029952,37.3375896283292],[-121.88568196581,37.3373324075011],[-121.885841627072,37.3375244051431],[-121.885904610431,37.3374913461099],[-121.886105976807,37.3374381851714],[-121.886313979433,37.3374311086025],[-121.886615750414,37.3374921671184],[-121.886744714358,37.3375875839854],[-121.88694012882,37.3375252593915],[-121.886816002679,37.3373790059473]]]]}
      }],

      "counter-sample": [{
        id: 'paseo-de-san-antonio',
        name: 'Paseo De San Antonio',
        geometry: {"type":"MultiPolygon","coordinates":[[[[-121.884680908919,37.3338543005284],[-121.884603631485,37.3337398055407],[-121.884735372802,37.3336736204644],[-121.884770651161,37.333705517861],[-121.884994357985,37.3336105478349],[-121.885041709587,37.3336700003962],[-121.885122115414,37.3336413521549],[-121.885145577379,37.3336595401359],[-121.885300523371,37.3335976964689],[-121.88534183857,37.3336433713011],[-121.885582627526,37.333534349243],[-121.885817464667,37.3334161644186],[-121.886069555183,37.3332931587302],[-121.886394257645,37.3333447137597],[-121.886412539341,37.3333952770321],[-121.88646455859,37.3333946616156],[-121.886791187163,37.3332384582321],[-121.886831475175,37.3332287488274],[-121.88720494833,37.3337275078101],[-121.886855113008,37.3338793706371],[-121.886707102459,37.3336918528693],[-121.886647847058,37.3336140765237],[-121.886652342276,37.3335447784924],[-121.886622329242,37.3334851214168],[-121.886581527206,37.3334671388926],[-121.886380257499,37.3335249159669],[-121.886269925148,37.3334985232153],[-121.886218162688,37.3335129844747],[-121.886242138613,37.3335588640947],[-121.885748745097,37.3337632011872],[-121.885653783966,37.3336304506867],[-121.885338368931,37.3337680530061],[-121.884738024217,37.3338166950987],[-121.884680908919,37.3338543005284]]]]}
      }, {
        id: 'city-hall',
        name: 'City Hall ',
        geometry: {"type":"MultiPolygon","coordinates":[[[[-121.886816002679,37.3373790059473],[-121.887010645469,37.3372751434583],[-121.887242072071,37.3375955469113],[-121.887242843269,37.3376370846849],[-121.885385960472,37.3385176851206],[-121.885276990193,37.3385651363895],[-121.88523040539,37.3385472217211],[-121.885123536254,37.3383961462204],[-121.885416021199,37.3382680484448],[-121.88549934161,37.3383963204688],[-121.885728670656,37.3382920501086],[-121.885681829137,37.338260289692],[-121.885796750204,37.3382220003166],[-121.88573723537,37.3381303775987],[-121.885775728583,37.3380237470662],[-121.885711460799,37.3379875763914],[-121.885623644052,37.3379286024948],[-121.885592945381,37.3378320226926],[-121.885464923856,37.3377873729631],[-121.885367344068,37.3378254570349],[-121.885249086321,37.3376837489159],[-121.885197406326,37.3377028250314],[-121.885173515274,37.3376615605157],[-121.885081715752,37.3376995760325],[-121.88501029952,37.3375896283292],[-121.88568196581,37.3373324075011],[-121.885841627072,37.3375244051431],[-121.885904610431,37.3374913461099],[-121.886105976807,37.3374381851714],[-121.886313979433,37.3374311086025],[-121.886615750414,37.3374921671184],[-121.886744714358,37.3375875839854],[-121.88694012882,37.3375252593915],[-121.886816002679,37.3373790059473]]]]}
      }],

      "pspl-pedestrian": [{
        id: 'gehl-n-5th',
        name:     'N 5th St',
        geometry: {"type":"Point","coordinates":[-121.886627379253,37.3385860978248]}
      },
      {
        id: 'gehl-city-hall-north-entrance',
        name:     'City Hall North Entrance',
        geometry: {"type":"Point","coordinates":[-121.886277092418,37.3380916789323]}
      },
      {
        id: 'gehl-city-hall-west-entrance',
        name:     'City Hall West Entrance',
        geometry: {"type":"Point","coordinates":[-121.887138604435,37.3374721308811]}
      },
      {
        id: 'gehl-s-4th',
        name:     'S 4th St',
        geometry: {"type":"Point","coordinates":[-121.886755820839,37.3367842125084]}
      },
      {
        id: 'gehl-southwest-alley',
        name:     'Southwest Alley',
        geometry: {"type":"Point","coordinates":[-121.886630198611,37.336868792693]}
      },
      {
        id: 'gehl-city-hall-south-entrance',
        name:     'City Hall South Entrance',
        geometry: {"type":"Point","coordinates":[-121.885589449378,37.3374096706313]}
      },
      {
        id: 'gehl-city-hall-southeast-entrance',
        name:     'City Hall SouthEast Entrance',
        geometry: {"type":"Point","coordinates":[-121.884970232052,37.3376893527245]}
      },
      {
        id: 'gehl-s-6th',
        name:     'S 6th St',
        geometry: {"type":"Point","coordinates":[-121.884694807972,37.3379580456124]}
      },
      {
        id: 'gehl-s-fernando-4th',
        name:     'S Fernando and 4th St',
        geometry: {"type":"Point","coordinates":[-121.885709221116,37.3357625359207]}
      },
      {
        id: 'gehl-santa-clara-east',
        name:     'Santa Clara East',
        geometry: {"type":"Point","coordinates":[-121.884353559124,37.3391207733097]}
      },
      {
        id: 'gehl-santa-clara-west',
        name:     'Santa Clara West',
        geometry: {"type":"Point","coordinates":[-121.888285097113,37.3372554372969]}
      }]
    },

    "mspf-pedestrian": [{
        "geometry": {
          "type": "Point",
          "coordinates": [
            -122.39549785852432,
            37.794062943376915
          ]
        },
        name: 'a',
        id: 'gehl-mspf-a'
      },{
        "geometry": {
          "type": "Point",
          "coordinates": [
            -122.39536374807356,
            37.793969683943764
          ]
        },
        name: 'b',
        id: 'gehl-mspf-b'
      },{
        "geometry": {
          "type": "Point",
          "coordinates": [
            -122.39990472793579,
            37.7905041647295
          ]
        },
        name: 'c',
        id: 'gehl-mspf-c'
      },{
        "geometry": {
          "type": "Point",
          "coordinates": [
            -122.39998787641524,
            37.79026252613533
          ]
        },
        name: 'd',
        id: 'gehl-mspf-d'
      },{
        "geometry": {
          "type": "Point",
          "coordinates": [
            -122.4054381251335,
            37.786160908408064
          ]
        },
        name: 'e',
        id: 'gehl-mspf-e'
      },{
        "geometry": {
          "type": "Point",
          "coordinates": [
            -122.40523695945738,
            37.786137591067366
          ]
        },
        name: 'f',
        id: 'gehl-mspf-f'
      },{
        "geometry": {
          "type": "Point",
          "coordinates": [
            -122.41081863641739,
            37.781902192067776
          ]
        },
        name: 'g',
        id: 'gehl-mspf-g'
      },{
        "geometry": {
          "type": "Point",
          "coordinates": [
            -122.41098761558531,
            37.78158844915323
          ]
        },
        name: 'h',
        id: 'gehl-mspf-h'
      },{
        "geometry": {
          "type": "Point",
          "coordinates": [
            -122.4167624115944,
            37.77723194876507
          ]
        },
        name: 'i',
        id: 'gehl-mspf-i'
      }, {
        "geometry": {
          "type": "Point",
          "coordinates": [
            -122.41691797971724,
            37.77692666611924
          ]
        },
        name: 'j',
        id: 'gehl-mspf-j'
    }],


    "mspf-stationary": [{
      "id": "N1",
      "name": "N1 Tree of Changes",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.39508479833601,
          37.79446141417424
        ]
      }
    },
    {
      "id": "N2",
      "name": "N2 Autodesk Keystone",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.39516258239745,
          37.794406306638834
        ]
      }
    },
    {
      "id": "S11",
      "name": "S11 Autodesk Keystone",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.3949882388115,
          37.794264298569715
        ]
      }
    },
    {
      "id": "N3",
      "name": "N3 Neuroflowers",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.39526718854904,
          37.79430880859089
        ]
      }
    },
    {
      "id": "N4",
      "name": "N4 Musical Pedals",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.39534229040146,
          37.79424522283814
        ]
      }
    },
    {
      "id": "S10",
      "name": "S10 Relax",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.39509016275407,
          37.79418799561385
        ]
      }
    },
    {
      "id": "S10",
      "name": "S10 Relax",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.3951679468155,
          37.79412652928656
        ]
      }
    },
    {
      "id": "S8",
      "name": "S8 Chime SF",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.39542007446289,
          37.79393153232357
        ]
      }
    },
    {
      "id": "S7",
      "name": "S7 The Zen Door",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.39549785852432,
          37.79386582670924
        ]
      }
    },
    {
      "id": "N5",
      "name": "N5 The Cephalapod",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.3956561088562,
          37.79399723787945
        ]
      }
    },
    {
      "id": "N6",
      "name": "N6 Common Ground",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.39584654569624,
          37.79381283826803
        ]
      }
    },
    {
      "id": "N17",
      "name": "N17 Protohouse",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.40049481391907,
          37.79032611531567
        ]
      }
    },
    {
      "id": "N15",
      "name": "N15 YBCA Tag Tunnel",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.40011930465697,
          37.79035579024779
        ]
      }
    },
    {
      "id": "N13",
      "name": "N13 Daily Boost",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.39990472793579,
          37.79053595922254
        ]
      }
    },
    {
      "id": "S16",
      "name": "S16 Peak Experience",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.40009784698486,
          37.790211654751644
        ]
      }
    },
    {
      "id": "S16",
      "name": "S16 Peak Experience",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.40018904209137,
          37.79013746725435
        ]
      }
    },
    {
      "id": "S20",
      "name": "S20 Understory",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.40036875009537,
          37.79000604921915
        ]
      }
    },
    {
      "id": "S22",
      "name": "S22 Bench Go Round",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.40045994520187,
          37.78984919512922
        ]
      }
    },
    {
      "id": "S24",
      "name": "S24 Data Lantern",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.40064501762389,
          37.78968386207941
        ]
      }
    },
    {
      "id": "S26",
      "name": "S26 Mineral Benches",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.40095347166061,
          37.78944857979379
        ]
      }
    },
    {
        "id": "N19",
        "name": "N19 Data Lantern",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.40090787410736,
          37.78979832346099
        ]
      }
    },
    {
      "id": "N33",
      "name": "N33 Gensler Portal 1",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.40575194358824,
          37.78598496829208
        ]
      }
    },
    {
      "id": "S42",
      "name": "S42 Rainbow Prismatic Experience",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.4055990576744,
          37.78574119515
        ]
      }
    },
    {
      "id": "S40",
      "name": "S40 Gensler Portal 2",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.40553468465805,
          37.78587898006826
        ]
      }
    },
    {
      "id": "S38",
      "name": "S38 Unsilence the Newsbin",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.40539252758025,
          37.78600404615623
        ]
      }
    },
    {
      "id": "S36",
      "name": "S36 Gensler Portal 4",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.40530401468277,
          37.786035842585534
        ]
      }
    },
    {
      "id": "S34",
      "name": "S34 Meetwall",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.40523427724837,
          37.786076118043
        ]
      }
    },
    {
      "id": "S32",
      "name": "S32 Tiny and Upside Down",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.40514844655989,
          37.78616938743922
        ]
      }
    },
    {
      "id": "N29",
      "name": "N29 Walk [Market St]",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.40522623062132,
          37.78636440488727
        ]
      }
    },
    {
      "id": "N31",
      "name": "N31 Gensler Portal 3",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.40535765886305,
          37.78625841720761
        ]
      }
    },
    {
      "id": "S54",
      "name": "S54 Ping Pong",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.41187006235123,
          37.780874043088666
        ]
      }
    },
    {
      "id": "S52",
      "name": "S52 Tenderloin Exertrail",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.41162329912186,
          37.78106483470159
        ]
      }
    },
    {
      "id": "S50",
      "name": "S50 Shimmering Stars",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.41132557392122,
          37.7812853043965
        ]
      }
    },
    {
      "id": "N43",
      "name": "N43 Peep Show",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.41146236658096,
          37.78142097772804
        ]
      }
    },
    {
      "id": "N35",
      "name": "N35 Street Sketches",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.41071671247481,
          37.782008185994705
        ]
      }
    },
    {
      "id": "N37",
      "name": "N37 Market [Scene]",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.4107998609543,
          37.78193611014092
        ]
      }
    },
    {
      "id": "N39",
      "name": "N39 Show Box",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.4109822511673,
          37.78180043775492
        ]
      }
    },
    {
      "id": "N41",
      "name": "N41 Studio for Urban Project",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.41105735301971,
          37.78174108100774
        ]
      }
    },
    {
      "id": "S46",
      "name": "S46 Hyphae Planter",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.41064429283142,
          37.781825876346275
        ]
      }
    },
    {
      "id": "S44",
      "name": "S44 Ping Pong",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.41052091121674,
          37.78191279146731
        ]
      }
    },
    {
      "id": "S48",
      "name": "S48 Timber Valley",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.41077035665512,
          37.781726241813494
        ]
      }
    },
    {
      "id": "N45",
      "name": "N45 Ghost Arroyos",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.41626352071762,
          37.77762627031679
        ]
      }
    },
    {
      "id": "N47",
      "name": "N47 Bookmark",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.4165666103363,
          37.77751179008296
        ]
      }
    },
    {
      "id": "N49",
      "name": "N49 Fog Plane",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.4167275428772,
          37.77739730967186
        ]
      }
    },
    {
      "id": "N53",
      "name": "N53 3 For Life",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.4167624115944,
          37.77723194876507
        ]
      }
    },
    {
      "id": "N55",
      "name": "N55 Exploratorium Anchor",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.41689920425415,
          37.777117467920625
        ]
      }
    },
    {
      "id": "N57",
      "name": "N57 Play Everyday",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.41712450981142,
          37.77710686783345
        ]
      }
    },
    {
      "id": "N60",
      "name": "N60 Mycelium Theater",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.41741955280304,
          37.77678250443156
        ]
      }
    },
    {
      "id": "N59",
      "name": "N59 Ember",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.41723716259001,
          37.77684398518567
        ]
      }
    },
    {
      "id": "S58",
      "name": "S58 Guerilla Street Museum",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.41712182760237,
          37.77672102362631
        ]
      }
    },
    {
      "id": "S56",
      "name": "S56 Living Roofs",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.41695016622542,
          37.77684822523581
        ]
      }
    },
    {
      "id": "N21",
      "name": "N21 Gensler Portal 5",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.4048963189125,
          37.786627253676905
        ]
      }
    },
    {
      "id": "N23",
      "name": "N23 Active Rest",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.40498214960098,
          37.78655306258097
        ]
      }
    },
    {
      "id": "N27",
      "name": "N27 Adaptive Playscapes",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.40510016679764,
          37.78646615291675
        ]
      }
    },
    {
      "id": "N27",
      "name": "N27 Adaptive Playscapes",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.404628098011,
          37.78662937342141
        ]
      }
    },
    {
      "id": "S14",
      "name": "S14 Sound of Emotion",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.39980280399324,
          37.790432097161286
        ]
      }
    },
    {
      "id": "S12",
      "name": "S12 News to Me",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.39958018064499,
          37.79061650521033
        ]
      }
    }]

  };

});
