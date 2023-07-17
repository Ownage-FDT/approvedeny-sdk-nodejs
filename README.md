# ApproveDeny SDK for Node.js

[![npm version](https://img.shields.io/npm/v/@ownage/approvedeny.svg?style=flat-square)](https://www.npmjs.com/package/@ownage/approvedeny)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=@ownage/approvedeny&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=@ownage/approvedeny)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@ownage/approvedeny?style=flat-square)](https://bundlephobia.com/package/@ownage/approvedeny@latest)
[![npm downloads](https://img.shields.io/npm/dm/@ownage/approvedeny.svg?style=flat-square)](https://npm-stat.com/charts.html?package=@ownage/approvedeny)
![GitHub Actions](https://github.com/Ownage-FDT/approvedeny-sdk-nodejs/actions/workflows/run-tests.yml/badge.svg)

The ApproveDeny SDK for Node.js provides an easy way to interact with the ApproveDeny API using Node.js.

## Installation
> **Requires [Node.js 16+](https://nodejs.org/en/about/releases/)**

You can install the package via npm:

```bash
npm install @ownage/approvedeny
```

## Usage
To use the SDK, you need to create an instance of the Client class. You can do this by passing your API key to the constructor.

```typescript
import { Client } from '@ownage/approvedeny'

const client = new Client('your-api-key');
```

### Creating a new check request
To create a new check request, you need to call the `createCheckRequest` method on the client instance.
```typescript
const checkRequest = await client.createCheckRequest('check-id', {
  description: 'A description of the check request',
  metadata: {
    key: 'value',
  },
});
```

### Retrieving a check request
To retrieve a check request, you need to call the `getCheckRequest` method on the client instance.
```typescript
const checkRequest = await client.getCheckRequest('check-request-id');
```

### Retrieving a check request response
To retrieve a check request response, you need to call the `getCheckRequestResponse` method on the client instance.
```typescript
const checkRequestResponse = await client.getCheckRequestResponse('check-request-id');
```

### Verifying webhook signatures
To verify webhook signatures, you need to call the `isValidWebhookSignature` method on the client instance. This method returns a boolean value indicating whether the signature is valid or not.

```typescript
const isValidSignature = client.isValidWebhookSignature('your-encryption-key', 'signature', { foo: 'bar' });

if (isValidSignature) {
  // The signature is valid
} else {
  // The signature is invalid
}
```

### Testing

```bash
npm run test
```

### Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

### Security

If you discover any security related issues, please use the issue tracker.

## Credits

-   [Olayemi Olatayo](https://github.com/iamolayemi)
-   [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
