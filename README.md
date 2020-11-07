# Document Management Component

Manipulates the documents based on taggings

## Repository Overview

- Backend for document-management-component, uses NoSQL to manipulate and process the data

## Prerequisites

1. npm version >= 6.14.4
2. node version >= v12.16.3
3. MongoDB shell version >= v4.2.6

## Setup

### Local:-

**STEP-1:** Clone the repository

```
git clone https://github.com/Narayanan2696/document-management-component.git
```

**STEP-2:** Create a **.env** file under the root folder and configure it as below (change the variable values as per requirements)

```
PORT=5001
DATABASE_URL=mongodb://localhost/document-management-component
AWS_REGION=<aws-region>
S3_BUCKET_NAME=<s3-bucket-name>
AWS_ACCESS_KEY=<aws-access-key>
AWS_SECRET_KEY=<aws-secret-key>
CLOUDFRONT_URL=<cloudfront-domain-url>
```

**STEP-3:** Install the required packages from **package.json**

```
npm install
```

**STEP-4:** Start the server

```
  npm run dev
```
