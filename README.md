# Tact template project

This template comes pre-configured to kickstart your new Tact project. It includes the Tact compiler, TypeScript, Jest integrated with [tact-emulator](https://github.com/tact-lang/tact-emulator), and a sample demonstrating how to run tests.

```shell
yarn test # To test contract
yarn build # To build contract
yarn lint # To find code issues in contract
yarn deploy # To deploy contract
```

## Deployment

To deploy a stom token, follow these steps:

1. Define the [`stom.tact`](./sources/stom.tact) file that will be used as entry point of your contract.
2. Customize the [`1_deploy_token.ts`](./sources/deploy/1_deploy_token.ts) file based on your `stom.tact` to generate a deployment link. It is crucial to ensure the proper invocation of the `init()` function within the contract.

## Testing

You can find some examples of contract tests in [`contract.spec.ts`](./sources/contract.spec.ts). For more information about testing, see the [Tact Documentation](https://docs.tact-lang.org/language/guides/debug).

To add new test files to your contracts, you should create `*.spec.ts` files similar to the template's one and they would be automatically included in testing.

## License

MIT
