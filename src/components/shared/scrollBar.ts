export const styledScrollBar = {
    '-ms-overflow-style': 'none',  /* IE and Edge */
    scrollbarWidth: 'none',  /* Firefox */
    '&::-webkit-scrollbar': {
        width: '4px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: '#555555',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#888',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#555',
    },
};