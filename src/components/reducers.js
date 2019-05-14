export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LANGUAGES: {
      const newState = { ...state };
      newState.languages = action.languages;
      return newState;
    }
  }
}
