package com.employeemanagement.manage_employee.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

@Component
public class DatabaseConnectionHelper {
    private static final Logger logger = Logger.getLogger(DatabaseConnectionHelper.class.getName());

    @Autowired
    private DataSource dataSource;

    /**
     * Utility method to validate database connections
     * This helps identify potential connection issues
     */
    public boolean validateConnection() {
        Connection conn = null;
        try {
            conn = dataSource.getConnection();
            if (conn != null && !conn.isClosed()) {
                logger.info("Database connection successful");
                return true;
            }
        } catch (SQLException e) {
            logger.log(Level.SEVERE, "Database connection validation failed", e);
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                    logger.info("Database connection closed properly");
                } catch (SQLException e) {
                    logger.log(Level.SEVERE, "Error closing database connection", e);
                }
            }
        }
        return false;
    }
}
