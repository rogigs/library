export const mockGetOneBook = {
  status: 200,
  data: {
    id: '0077b50c-4f46-4450-a396-d008a2f5e72b',
    createdAt: '2024-01-29T21:32:17.000Z',
    active: 1,
    updateAt: '2024-01-30T11:58:13.000Z',
    deleteAt: '2024-01-29T21:52:52.000Z',
    name: 'FOI MUITO',
    publisher: 'Nome do Editor',
    author: 'Nome do Autor',
    year: '2023',
    language: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a',
    updateByUser: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a',
    description: 'Descrição do Livro',
    updateDate: '23/10/2011',
    createdByUser: 'a310ff33-1533-4c69-8ff1-6a8eb0d92ada',
    image: {
      id: 'a310ff33-1533-4c69-8ff1-6a8eb0d92091',
      createdAt: '2024-01-29T21:32:17.000Z',
      src: 'https://m.media-amazon.com/images/I/71ZLavBjpRL._AC_UF1000,1000_QL80_.jpg',
      alt: 'Texto_Alternativo_da_Imagem',
    },
    category: {
      id: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a',
      createdAt: '2024-01-27T20:32:10.000Z',
      name: 'novo',
    },
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
