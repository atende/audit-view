package br.pucminas.icei.audition.audition;

import java.util.Arrays;
import java.util.List;

/**
 * Utility to convert strings separated with ; (csv) to lists and vice versa
 * This utility is not fully csv compatible. For instance,
 * it do not parse valid characters and assume a simple split
 * @author Giovanni Silva
 */
public class StringUtil {
    /**
     * Convert List of strins to csv
     * @param list List to be converted. Optimistic code, the strings on the list
     *             should <b>not</b> contain <b>;<b/>
     * @return String separated by ;
     */
    public static String toCsv(final List<String> list) {
        return toString(list, ';');
    }

    /**
     * Convert from CSV to List. Optmistic code.
     * @param string  The string separated by ;
     * @return List of strings
     */
    public static List<String> fromCsv(final String string){
        return fromString(string, ';');
    }

    /**
     * Convert a list of strings to a string separated by delimiter
     * @param list List
     * @param delimiter Delimiter
     * @return String
     */
    public static String toString(final List<String> list, char delimiter) {
        final StringBuilder b = new StringBuilder();
        if (list != null) {
            for (int i = 0; i < list.size(); i++) {
                b.append(list.get(i));
                if (i != list.size() - 1) {
                    b.append(delimiter);
                }
            }
        }
        return b.toString();
    }

    /**
     * Convert a string to a list os String separated by a delimiter
     * @param string String
     * @param delimiter delimiter
     * @return List os the pieces
     */
    public static List<String> fromString(final String string, char delimiter){
        String[] split = string.split(String.valueOf(delimiter));
        return Arrays.asList(split);
    }
}
