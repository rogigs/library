export const mockGetOneBook = {
  status: 200,
  data: {
    id: '11c2b57e-3ec0-4372-9f16-cd53c67c574e',
    createdAt: '2024-01-31T06:04:48.000Z',
    active: 0,
    updateAt: '2024-01-31T06:06:33.000Z',
    deleteAt: '2024-01-31T06:06:33.000Z',
    name: 'Senhor dos aneis',
    publisher: 'Nao sei',
    author: 'TolkiEN',
    year: '1980',
    description: 'Muito bom',
    category: {
      id: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a',
      createdAt: '2024-01-27T20:32:10.000Z',
      name: 'novo',
    },
    language: '001df5c9-b9ec-4f1e-b913-d0a91137b28e',
    image: {
      id: '001df5c9-b9ec-4f1e-b913-d0a91137b28e',
      createdAt: '2024-01-31T06:04:48.000Z',
      src: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fharpercollins.com.br%2Fproducts%2Fbox-trilogia-o-senhor-dos-aneis-jrr-tolkien&psig=AOvVaw2vIdbRxt5AxkSaC6WcnJOW&ust=1706767402098000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCLkvz5hoQDFQAAAAAdAAAAABAY',
      alt: 'Senhor dos aneis livro',
    },
    createdByUser: {
      id: '2',
      email: 'novo@novo.com',
    },
    deletedByUser: {
      id: '1',
      email: 'ds@c.com',
    },
    updatedByUser: '001df5c9-b9ec-4f1e-b913-d0a91137b28e',
  },
};

export const mockGetBookPagination = {
  status: 200,
  data: {
    items: [
      {
        id: '793bdb81-3753-4b99-ba4e-452472bb14fb',
        createdAt: '2024-01-30T12:41:51.000Z',
        active: 1,
        updateAt: '2024-01-30T12:41:51.000Z',
        deleteAt: '2024-01-30T12:41:51.000Z',
        name: 'sda',
        publisher: 'dsa',
        author: 'dsa',
        year: '2032',
        language: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a',
        description: 'dsadasdsadsa',
        image: {
          id: 'efb7485e-b13a-434f-9e58-b5ab8f3248a6',
          createdAt: '2024-01-30T12:41:51.000Z',
          src: 'dsa',
          alt: 'dsa',
        },
      },
      {
        id: 'abc76ec6-4fea-4d20-9672-2dad271d85de',
        createdAt: '2024-01-30T12:26:14.000Z',
        active: 1,
        updateAt: null,
        deleteAt: null,
        name: 'FODA',
        publisher: 'Nome do Editor',
        author: 'Nome do Autor',
        year: '2023',
        language: 'Idioma do Livro',
        description: 'Descrição do Livro',
        image: {
          id: 'f7b09c74-4163-45bf-ad9d-66b4905a500f',
          createdAt: '2024-01-30T12:26:14.000Z',
          src: 'Fonte_da_Imagem',
          alt: 'Texto_Alternativo_da_Imagem',
        },
      },
      {
        id: 'c9785987-ce2a-4c06-9e14-cecefb6fffe7',
        createdAt: '2024-01-30T12:41:57.000Z',
        active: 1,
        updateAt: null,
        deleteAt: null,
        name: 'sda',
        publisher: 'dsa',
        author: 'dsa',
        year: '2032',
        language: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a',
        description: 'dsadasdsadsa',
        image: {
          id: '7808f47d-6940-41b5-9e0c-9ebb04fc9b45',
          createdAt: '2024-01-30T12:41:57.000Z',
          src: 'dsa',
          alt: 'dsa',
        },
      },
    ],
    total: 3,
    currentPage: 1,
    totalPages: 1,
  },
};

export const mockSearchBook = {
  status: 200,
  data: mockGetBookPagination.data.items,
};

export const mockItem = {
  status: 200,
  data: [
    {
      id: 'c8488111-e73e-48b9-946e-0a811955a1e7',
      createdAt: '2024-02-01T13:58:49.000Z',
      name: 'Generic',
    },
  ],
};
