export interface RoleTreeData {
  id: string;
  name: {
    value: string;
  };
  organizationalHierarchy: {
    value: string;
  };
  subsets?: RoleTreeData[]; // Updated property name from nestedItems to subsets
  roles?: {
    id: string;
    name: {
      _: string;
      value: string;
    };
  }[];
}

export const stackItems = [
  // 20231031164250
  // http://192.168.20.137:3003/api/v1/hierarchy-tree

  {
    id: '5968f6d0-e356-43d5-9982-e74944f22d5d',
    name: {
      value: 'pouya garan',
    },
    organizationalHierarchy: {
      value: 'company',
    },
    roles: [],
    subsets: [
      {
        id: '5968f6d0-e356-43d5-9982-e74944f22d51',
        name: {
          value: 'backend',
        },
        organizationalHierarchy: {
          value: 'team',
        },
        roles: [
          {
            id: 'ca38f7ac-9d7b-4cba-9914-e5565ee38875',
            name: {
              _: 'StaticText',
              value: 'Backend Developer',
            },
          },
        ],
        subsets: [],
      },
      {
        id: '5968f6d0-e356-43d5-9982-e74944f22d5f',
        name: {
          value: 'font',
        },
        organizationalHierarchy: {
          value: 'team',
        },
        roles: [
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38875',
            name: {
              _: 'StaticText',
              value: 'Frontend Developer',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38876',
            name: {
              _: 'StaticText',
              value: 'Frontend Developer2',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38877',
            name: {
              _: 'StaticText',
              value: ' Developer3',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38878',
            name: {
              _: 'StaticText',
              value: 'Developer2',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38879',
            name: {
              _: 'StaticText',
              value: 'Developer3',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38880',
            name: {
              _: 'StaticText',
              value: 'Developer4',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38881',
            name: {
              _: 'StaticText',
              value: 'Developer5',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38882',
            name: {
              _: 'StaticText',
              value: 'Developer6',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38883',
            name: {
              _: 'StaticText',
              value: 'Developer7',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38884',
            name: {
              _: 'StaticText',
              value: 'Developer8',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38885',
            name: {
              _: 'StaticText',
              value: 'Developer9',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38886',
            name: {
              _: 'StaticText',
              value: 'Developer10',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38887',
            name: {
              _: 'StaticText',
              value: 'Developer11',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38888',
            name: {
              _: 'StaticText',
              value: 'Developer12',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38889',
            name: {
              _: 'StaticText',
              value: 'Developer13',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38890',
            name: {
              _: 'StaticText',
              value: 'Developer14',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38891',
            name: {
              _: 'StaticText',
              value: 'Developer15',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38892',
            name: {
              _: 'StaticText',
              value: 'Developer16',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38893',
            name: {
              _: 'StaticText',
              value: 'Developer17',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38894',
            name: {
              _: 'StaticText',
              value: 'Developer18',
            },
          },
          {
            id: 'ca38f7ac-9d7b-4cba-9914-34565ee38895',
            name: {
              _: 'StaticText',
              value: 'Developer19',
            },
          },
        ],
        subsets: [],
      },
    ],
  },
  {
    id: '5968f6d0-e356-43d5-9982-e74944f22d75',
    name: {
      value: 'hyvad',
    },
    organizationalHierarchy: {
      value: 'company',
    },
    roles: [],
    subsets: [
      {
        id: '5968f6d0-e356-43d5-9982-e74944f22d34',
        name: {
          value: 'offic',
        },
        organizationalHierarchy: {
          value: 'team',
        },
        roles: [],
        subsets: [
          {
            id: '1',
            name: {
              value: 'subset1',
            },
            organizationalHierarchy: {
              value: 'team',
            },
            roles: [],
            subsets: [
              {
                id: '2',
                name: {
                  value: 'subset2',
                },
                organizationalHierarchy: {
                  value: 'team',
                },
                roles: [],
                subsets: [
                  {
                    id: '3',
                    name: {
                      value: 'subset3',
                    },
                    organizationalHierarchy: {
                      value: 'team',
                    },
                    roles: [],
                    subsets: [
                      {
                        id: '4',
                        name: {
                          value: 'subset4',
                        },
                        organizationalHierarchy: {
                          value: 'team',
                        },
                        roles: [
                          {
                            id: '132432',
                            name: {
                              _: 'StaticText1',
                              value: '1 Developer',
                            },
                          },
                          {
                            id: '23243244',
                            name: {
                              _: 'StaticText2',
                              value: '2 Developer',
                            },
                          },
                          {
                            id: '334231',
                            name: {
                              _: 'StaticText3',
                              value: '3 Developer',
                            },
                          },
                        ],
                        subsets: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
