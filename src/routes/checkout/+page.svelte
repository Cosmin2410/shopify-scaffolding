<script lang="ts">
	import { cart } from '$lib/store/cart';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<Button href={$cart?.checkoutUrl}>Proceed to Checkout</Button>
