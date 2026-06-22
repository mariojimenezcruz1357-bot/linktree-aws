const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

// Inicializamos el cliente de DynamoDB
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

// El nombre de la tabla nos llegará como variable de entorno desde la infraestructura (SAM)
const tableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
    console.log("Petición recibida en API Gateway:", JSON.stringify(event));

    try {
        // Hacemos un "Scan" para obtener todos los elementos (links) de la tabla
        const command = new ScanCommand({
            TableName: tableName,
        });

        const result = await dynamo.send(command);

        // Devolvemos la respuesta formateada con CORS para que el Frontend pueda leerla
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // ¡Importante para que nuestra web pueda llamarlo!
                "Access-Control-Allow-Methods": "GET",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(result.Items)
        };

    } catch (error) {
        console.error("Error al leer de DynamoDB:", error);
        
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: "Error interno del servidor", error: error.message })
        };
    }
};
