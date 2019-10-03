export const centerCss = `
<style>
  .spr-demo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: .5rem;
    height: 100%;
    position: absolute;
    width: 100%;
  }
</style>
`;

export const pipeCss = `
${centerCss}
<style>
  .spr-demo-child {
    background: white;
    padding: 40px;
    border: 1px solid gray;
  }
</style>
`;
