<script context="module">
  import { crossfade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  const [send, receive] = crossfade({
    duration: d => Math.sqrt(d * 200),

    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
      };
    }
  });
</script>

<script>
  import { columns } from "./data.js";
  import Card from "./Card.svelte";
  export let column;

  function moveCardLeft(event) {
    columns.moveCardLeft(event.detail, column);
  }

  function moveCardRight(event) {
    columns.moveCardRight(event.detail, column);
  }

  function addCard() {
    let content = prompt("Enter new card text");
    if (content) {
      columns.addCard(column, content);
    } else {
      alert("You did not enter any content");
    }
  }
</script>

<style>
  .column-holder {
    margin-right: 25px;
  }
  .column {
    background-color: #f5f6fa;
    min-height: 650px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    min-width: 300px;
    border-radius: 10px;
    padding-top: 10px;
  }
  h2 {
    color: white;
    text-align: center;
    min-width: 140px;
    padding: 10px 0;
    border-radius: 10px;
  }
  h2.red {
    background-color: #ea2027;
  }
  h2.blue {
    background-color: #0652dd;
  }

  h2.green {
    background-color: #009432;
  }

  h2.yellow {
    background-color: #ffc312;
    color: black;
  }
  button {
    width: 100%;
    text-align: center;
  }
</style>

<div class="column-holder">
  <h2 class={column.color}>{column.name}</h2>
  <div class="column">
    {#each column.cards as card (card.id)}
      <div
        class="card"
        in:receive={{ key: card.id }}
        out:send={{ key: card.id }}>
        <Card
          {card}
          on:movecardleft={moveCardLeft}
          on:movecardright={moveCardRight} />
      </div>
    {/each}
  </div>
  <button on:click={addCard}>+ Add a card</button>
</div>
