import styled from "@emotion/styled";

export const SettingsContainer = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
`;

export const SettingsSidebar = styled.div`
  flex-basis: 230px;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const SidebarItem = styled.button`
  display: block;
  box-sizing: border-box;
  height: 50px;
  width: 100%;
  padding-left: 10px;
  text-align: left;
  font-size: 0.8rem;
  ${props => props.active && "background-color: rgba(255, 255, 255, 0.5)"}
`;
