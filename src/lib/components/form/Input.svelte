<script lang="ts">
	interface Props {
		[key: string]: any
		id?: string
		label?: string
		name: string
		type?: string
	}

	let { label, name, id, type, ...restProps }: Props = $props()
</script>

<div class="space-y-1">
	<label
		class="block w-full"
		for={id || name}>{label}</label>
	<input
		class="w-full rounded"
		type={type || 'text'}
		{name}
		id={id || name}
		{...restProps} />
</div>
