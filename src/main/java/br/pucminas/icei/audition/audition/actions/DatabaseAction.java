package br.pucminas.icei.audition.audition.actions;

/**
 * Common database actions to applications
 * @author Giovanni Silva.
 */
public enum DatabaseAction {
    INSERT,
    UPDATE,
    DELETE,
    SELECT,
    INSERT_OR_UPDATE;

    public static final String PREFIX = "database_";

    @Override
    public String toString(){
        return PREFIX + name().toLowerCase();
    }

}
