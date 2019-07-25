import { css } from "@emotion/core";

export const titlebarStyle = css`
  -webkit-user-select: none;
  -webkit-app-region: drag;
  height: 30px;
  position: absolute;
  width: 100%;
`;

export const appStyle = css`
  color: white;
  background: linear-gradient(
    180deg,
    rgba(18, 27, 37, 0.95) 0%,
    rgba(48, 70, 98, 0.85) 100%
  );
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

export const buttonStyle = css`
  justify-self: flex-end;
`;

export const headerStyle = css`
  display: flex;
  justify-content: space-between;
`;
