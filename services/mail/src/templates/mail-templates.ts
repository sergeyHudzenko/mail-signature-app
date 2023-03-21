const mailTemplate1 = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mail Signature #1</title>
</head>
<body>
    <table>
        <tr>
            <td>
                <h1 style="color: red;">Mail Signature #1</h1>
            </td>
        </tr>
        <tr>
            <td>
                <h2>{{fullName}}</h2>
                <p>{{title}}</p>
                <p>{{company}}</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>{{email}}</p>
                <p>{{phone}}</p>
                <p>{{address}}</p>
            </td>
        </tr>
    </table>
</body>
</html>
`;


const mailTemplate2 = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mail Signature #2</title>
</head>
<body>
    <table>
        <tr>
            <td>
                <h1 style="color: green;">Mail Signature #2</h1>
            </td>
        </tr>
        <tr>
            <td>
                <h2>{{fullName}}</h2>
                <p>{{title}}</p>
                <p>{{company}}</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>{{email}}</p>
                <p>{{phone}}</p>
                <p>{{address}}</p>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export default {
    mailTemplate1,
    mailTemplate2
};