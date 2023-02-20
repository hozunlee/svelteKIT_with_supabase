<script>
	import { userName } from '../../store/stores';

	let modal;
</script>

<button on:click={() => modal.showModal()}> show modal</button>
<dialog bind:this={modal} class="modal">
	Hello! I'm {$userName}

	<form method="dialog">
		<button value="close">Close</button>
		<button value="confirm">Confirm</button>
	</form>
</dialog>

<style>
	.modal {
		color: blue;
	}
	.modal::backdrop {
		background-color: rgba(0, 0, 0, 0.8);
	}
</style>
