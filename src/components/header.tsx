import styled from 'styled-components';

const Name = styled.h1`
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 700;
  font-style: normal;
  font-weight: medium;
  font-size: 64px;
  line-height: 78px;
`;

const Header: React.FC = () => {
  return (
    <div>
      <Name>ONLY.</Name>
    </div>
  );
}

export default Header;
