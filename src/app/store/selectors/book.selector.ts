import { IAppState } from '../states/app.state';

export const bookSelector = (appState: IAppState) => appState.books.data;
