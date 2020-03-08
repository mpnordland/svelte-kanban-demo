<script>
  import { createEventDispatcher } from "svelte";

  // Props
  export let card;

  const dispatch = createEventDispatcher();

  function leftClick() {
    dispatch("movecardleft", card);
  }

  function rightClick() {
    dispatch("movecardright", card);
  }
</script>

<style>
  div {
    background: white;
    margin-bottom: 10px;
    border-radius: 10px;
  }
  span {
    display: inline-block;
    width: 200px;
  }
  button {
    margin: 0 5px;
    background: none;
    border: none;
    text-align: center;
  }
  button::before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border-left: 1px solid black;
    border-top: 1px solid black;
    border-right: none;
    border-bottom: none;
    border-radius: 0;
    background: none;
  }

  button.left::before {
    transform: rotate(-45deg);
  }
  button.right::before {
    transform: rotate(135deg);
  }
</style>

<div>
  <button class="left" on:click={leftClick} />
  <span>{card.content}</span>
  <button class="right" on:click={rightClick} />
</div>
