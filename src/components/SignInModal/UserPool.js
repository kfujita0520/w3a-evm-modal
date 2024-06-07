import {CognitoUserPool} from 'amazon-cognito-identity-js';

// Test No Verification cognito details....
// const poolData = {
//     UserPoolId:"us-west-1_SDGQMDdNq",
//     ClientId:"1405on8nsnslfociu0abs6b4ql"
// };

const poolData = {
    UserPoolId:"us-east-1_BaoAstANT",
    ClientId:"4jsjp5p0gp3omvn21qp24vg8b4"
};

export default new CognitoUserPool(poolData);
