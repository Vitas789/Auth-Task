import styled from 'styled-components';

const Name = styled.h1`
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 700;
  font-style: normal;
  font-weight: medium;
  font-size: 64px;
  line-height: 78px;
  margin-bottom: 250px;
`;

function Header(props: any) {
  return (
    <div>
      <Name>ONLY.</Name>
    </div>
  );
}

export default Header;
