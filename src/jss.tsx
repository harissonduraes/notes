import styled from '@emotion/styled';

export const Nav = styled.nav((
) => {
    return {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px 10px'
    }
})

export const Div = styled.div((
) => {
    return {
        display: 'flex',
        alignItems: 'center'
    }
})

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;