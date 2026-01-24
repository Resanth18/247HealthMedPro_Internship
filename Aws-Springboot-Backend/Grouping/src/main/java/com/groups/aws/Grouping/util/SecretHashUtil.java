package com.groups.aws.Grouping.util;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class SecretHashUtil {

    public static String calculateSecretHash(
            String username,
            String clientId,
            String clientSecret) {

        try {
            String message = username + clientId;

            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec key =
                    new SecretKeySpec(clientSecret.getBytes(), "HmacSHA256");
            mac.init(key);

            byte[] rawHmac = mac.doFinal(message.getBytes());
            return Base64.getEncoder().encodeToString(rawHmac);

        } catch (Exception e) {
            throw new RuntimeException("Error generating SECRET_HASH", e);
        }
    }
}
